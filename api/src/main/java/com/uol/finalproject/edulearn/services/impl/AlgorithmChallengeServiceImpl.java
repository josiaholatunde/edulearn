package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.ChallengeSubmissionDTO;
import com.uol.finalproject.edulearn.apimodel.CodeJudgeBatchRequest;
import com.uol.finalproject.edulearn.apimodel.CodeJudgeBatchResponse;
import com.uol.finalproject.edulearn.apimodel.CodeJudgeRequest;
import com.uol.finalproject.edulearn.apimodel.request.ChallengeUserResponse;
import com.uol.finalproject.edulearn.entities.*;
import com.uol.finalproject.edulearn.entities.enums.ProgrammingLanguage;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.QuestionRepository;
import com.uol.finalproject.edulearn.services.AlgorithmChallengeService;
import com.uol.finalproject.edulearn.services.CodeJudgeRestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AlgorithmChallengeServiceImpl implements AlgorithmChallengeService {

    private final QuestionRepository questionRepository;
    private final CodeJudgeRestService codeJudgeRestService;

    @Override
    public ChallengeSubmissionDTO saveChallengeQuestionResponses(ChallengeSubmission challengeSubmission, Challenge challenge, ChallengeUserResponse challengeUserResponse) {

        ProgrammingLanguage language = challengeUserResponse.getLanguage();
        String languageId = getCodeJudgeLanguageId(challengeUserResponse.getLanguage());
        for (Map.Entry<Long, String> entry: challengeUserResponse.getAlgorithmResponse().entrySet()) {
            long questionId = entry.getKey();
            String userSolution = entry.getValue();
            try {
                List<String> mainMethodToUserSolution = appendMainMethodToUserSolution(language, questionId, userSolution);
                CodeJudgeBatchResponse codeJudgeBatchResponse = codeJudgeRestService.executeCode(CodeJudgeBatchRequest.builder()
                        .submissions(mainMethodToUserSolution
                                .stream().map(solution ->
                                        CodeJudgeRequest.fromSolutionCode(solution, languageId))
                                .collect(Collectors.toList())
                        )
                        .build());
                log.info("Submission  response from code judge {}", codeJudgeBatchResponse);
            } catch (Exception ex) {

            }
        }
        return null;
    }

    private String getCodeJudgeLanguageId(ProgrammingLanguage language) {
        return "62";
    }

    private List<String> appendMainMethodToUserSolution(ProgrammingLanguage language, long questionId, String userSolution) throws Exception {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new ResourceNotFoundException("Invalid question id"));
        switch (language) {
            case JAVA: return appendMainMethodToUserSolutionInJava(question.getAlgorithmQuestion(), userSolution);
        }
        return new ArrayList<>();
    }

    private List<String> appendMainMethodToUserSolutionInJava(AlgorithmQuestion question, String userSolution) throws Exception {
        StringBuilder mainMethod = new StringBuilder("public static void main(String[] args) {");
        mainMethod.append(String.format("Main soln = new Main();\nvar actualResult = soln.%s(",question.getMethodName()));
        List<String> userCodeAndTestCases = new ArrayList<>();

        if (question.getExamples().isEmpty()) throw new Exception("No examples configured for question");

        for (AlgorithmQuestionExample example: question.getExamples()) {
            StringBuilder currentUserExample = mainMethod;

            if (question.getMethodArguments() != null && !question.parseJsonToMethodArguments().isEmpty()) {
                for (Map.Entry<String, Object> entry: example.getInputArguments().entrySet()) {
                    currentUserExample.append(entry.getValue() + ",");
                }
            }
            currentUserExample.setLength(currentUserExample.length() - 1);
            currentUserExample.append(");");

            currentUserExample.append(String.format("System.out.println(\"UserOutput: actualResult \");", example.getOutput()));
            currentUserExample.append(String.format("boolean isCorrect = %s.equals(actualResult);", example.getOutput()));
            currentUserExample.append("System.out.println(\"Result: isCorrect \");");
            currentUserExample.append("\n}\n}");
            userCodeAndTestCases.add(currentUserExample.toString());
        }


        log.info("Generated code {}", userCodeAndTestCases);
        return userCodeAndTestCases;
    }
}
