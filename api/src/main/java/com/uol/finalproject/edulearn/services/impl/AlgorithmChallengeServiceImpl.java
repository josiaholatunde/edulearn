package com.uol.finalproject.edulearn.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javaparser.JavaParser;
import com.github.javaparser.ParseResult;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.Modifier;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.body.TypeDeclaration;
import com.github.javaparser.ast.stmt.BlockStmt;
import com.uol.finalproject.edulearn.apimodel.*;
import com.uol.finalproject.edulearn.apimodel.request.ChallengeUserResponse;
import com.uol.finalproject.edulearn.entities.*;
import com.uol.finalproject.edulearn.entities.enums.ProgrammingLanguage;
import com.uol.finalproject.edulearn.exceptions.AlgorithmQuestionResultException;
import com.uol.finalproject.edulearn.exceptions.BadRequestException;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.QuestionRepository;
import com.uol.finalproject.edulearn.services.ChallengeEvaluatorService;
import com.uol.finalproject.edulearn.services.CodeJudgeRestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static java.lang.Thread.sleep;

@Service
@Slf4j
@RequiredArgsConstructor
public class AlgorithmChallengeServiceImpl implements ChallengeEvaluatorService {

    private final QuestionRepository questionRepository;
    private final CodeJudgeRestService codeJudgeRestService;
    private final PythonParserExecutorServiceImpl pythonParserExecutorService;
    private final JavascriptParserExecutorServiceImpl javascriptParserExecutorService;
    private final JavaParserExecutorServiceImpl javaParserExecutorService;

    @Override
    public ChallengeSubmissionDTO saveChallengeQuestionResponses(ChallengeSubmission challengeSubmission, Challenge challenge, ChallengeUserResponse challengeUserResponse) throws Exception {

        ProgrammingLanguage language = challengeUserResponse.getLanguage();
        String languageId = getCodeJudgeLanguageId(challengeUserResponse.getLanguage());
        ChallengeSubmissionDTO challengeSubmissionDTO = ChallengeSubmissionDTO.builder().build();
        for (Map.Entry<Long, String> entry : challengeUserResponse.getAlgorithmResponse().entrySet()) {
            long questionId = entry.getKey();
            String userSolution = entry.getValue();

            List<Pair<AlgorithmQuestionExample, String>> mainMethodToUserSolution = appendMainMethodToUserSolution(language, questionId, userSolution);
            if (mainMethodToUserSolution.isEmpty()) continue;
            CodeJudgeBatchRequest requestBody = CodeJudgeBatchRequest.builder()
                    .submissions(mainMethodToUserSolution
                            .stream().map(solution ->
                                    CodeJudgeRequest.fromSolutionCode(solution.getSecond(), languageId))
                            .collect(Collectors.toList())
                    )
                    .build();
            ObjectMapper objectMapper = new ObjectMapper();
            List<CodeJudgeSubmitResponse> submitResponse = codeJudgeRestService.executeCode(objectMapper.writeValueAsString(requestBody));
            StringBuilder tokens = new StringBuilder();
            for (int i = 0; i < submitResponse.size(); i++) {
                tokens.append(submitResponse.get(i).getToken());
                if (i != submitResponse.size() - 1) tokens.append(",");
            }
            sleep(3000);
            CodeJudgeBatchResponse codeJudgeBatchResponse = codeJudgeRestService.getSubmissionsBatch(String.format("/submissions/batch?tokens=%s", tokens));
            int totalExamples = codeJudgeBatchResponse.getSubmissions().size(), totalCorrect = 0;

            for (int index = 0; index < codeJudgeBatchResponse.getSubmissions().size(); index++) {
                CodeJudgeResponse codeJudgeResponse = codeJudgeBatchResponse.getSubmissions().get(index);
                AlgorithmQuestionExample example = mainMethodToUserSolution.get(index).getFirst();

                String stdout = codeJudgeResponse.getStdout();
                AlgoTestCaseResult algoTestCaseResult = AlgoTestCaseResult.builder()
                        .testCaseId(example.getId())
                        .expectedOutput(example.getOutput())
                        .build();

                if (Strings.isNotBlank(codeJudgeResponse.getCompileOutput())) {
                    algoTestCaseResult.setCompilationError(codeJudgeResponse.getCompileOutput());
                } else if (Strings.isNotBlank(codeJudgeResponse.getStderr())) {
                    algoTestCaseResult.setCompilationError(codeJudgeResponse.getStderr());
                }

                if (stdout != null) {
                    algoTestCaseResult = parseResponse(stdout, algoTestCaseResult);
                }

                if (algoTestCaseResult.isTestCasePassed()) totalCorrect++;
                challengeSubmissionDTO.getAlgoResult().add(algoTestCaseResult);
            }
            challengeSubmissionDTO.setTotalQuestions(totalExamples);
            challengeSubmissionDTO.setTotalCorrect(totalCorrect);
            float percentage = (totalCorrect / (float) totalExamples) * 100;
            challengeSubmissionDTO.setScore(percentage);
            log.info("Submission  response from code judge {}", codeJudgeBatchResponse);

        }
        return challengeSubmissionDTO;
    }


    private AlgoTestCaseResult parseResponse(String resultString, AlgoTestCaseResult algoTestCaseResult) {
        String[] linesFromOutput = resultString.split("\n");
        boolean isCorrect = false;
        String userOutput = null;

        for (String line : linesFromOutput) {
            String[] parts = line.split(" = ");
            if (parts.length > 1) {
                String key = parts[0];
                String value = parts[1];
                if (key.equals("IsCorrect")) {
                    isCorrect = Boolean.parseBoolean(value.trim());
                } else if (key.equals("UserOutput")) {
                    userOutput = value.trim();
                }
            }
        }
        algoTestCaseResult.setTestCasePassed(isCorrect);
        algoTestCaseResult.setUserOutput(userOutput);
        return algoTestCaseResult;
    }

    private String getCodeJudgeLanguageId(ProgrammingLanguage language) {
        switch (language) {
            case PYTHON:
                return "71";
            case JAVASCRIPT:
                return "63";
            case JAVA:
            default:
                return "62";
        }
    }

    private List<Pair<AlgorithmQuestionExample, String>> appendMainMethodToUserSolution(ProgrammingLanguage language, long questionId, String userSolution) throws Exception {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new ResourceNotFoundException("Invalid question id"));
        switch (language) {
            case JAVA:
                return javaParserExecutorService.appendMainMethodToUserSolution(question.getAlgorithmQuestion(), userSolution);
            case PYTHON:
                return pythonParserExecutorService.appendMainMethodToUserSolution(question.getAlgorithmQuestion(), userSolution);
            case JAVASCRIPT:
                return javascriptParserExecutorService.appendMainMethodToUserSolution(question.getAlgorithmQuestion(), userSolution);
            default:
                throw new BadRequestException("Language is not currently supported");
        }
    }
}
