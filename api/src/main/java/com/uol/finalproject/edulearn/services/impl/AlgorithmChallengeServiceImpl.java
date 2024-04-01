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
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AlgorithmChallengeServiceImpl implements ChallengeEvaluatorService {

    private final QuestionRepository questionRepository;
    private final CodeJudgeRestService codeJudgeRestService;
    private final PythonParserExecutorServiceImpl pythonParserExecutorService;

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

                algoTestCaseResult.setCompilationError(codeJudgeResponse.getCompileOutput());
                algoTestCaseResult = parseResponse(stdout, algoTestCaseResult);

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
                    isCorrect = Boolean.parseBoolean(value);
                } else if (key.equals("UserOutput")) {
                    userOutput = value;
                }
            }
        }
        algoTestCaseResult.setTestCasePassed(isCorrect);
        algoTestCaseResult.setUserOutput(userOutput);
        return algoTestCaseResult;
    }

    private String getCodeJudgeLanguageId(ProgrammingLanguage language) {
        return "62";
    }

    private List<Pair<AlgorithmQuestionExample, String>> appendMainMethodToUserSolution(ProgrammingLanguage language, long questionId, String userSolution) throws Exception {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new ResourceNotFoundException("Invalid question id"));
        switch (language) {
            case JAVA:
                return appendMainMethodToUserSolutionInJava(question.getAlgorithmQuestion(), userSolution);
            case PYTHON:
                return pythonParserExecutorService.appendMainMethodToUserSolutionInPython(question.getAlgorithmQuestion(), userSolution);
            default:
                throw new BadRequestException("Language is not currently supported");
        }
    }

    private List<Pair<AlgorithmQuestionExample, String>> appendMainMethodToUserSolutionInJava(AlgorithmQuestion question, String userSolution) throws Exception {
        ParseResult<CompilationUnit> cu = new JavaParser().parse(userSolution);

        cu.getResult().orElseThrow(() -> new AlgorithmQuestionResultException("Failed to parse user solution"));

        List<Pair<AlgorithmQuestionExample, String>> allExamplesForCodeJudge = new ArrayList<>();

        // Add example input arguments
        for (AlgorithmQuestionExample example : question.getExamples()) {
            ParseResult<CompilationUnit> cuExample = new JavaParser().parse(userSolution);
            CompilationUnit compilationUnitExample = cuExample.getResult().orElseThrow(() -> new Exception("Failed to parse user solution"));

            TypeDeclaration<?> mainClass = compilationUnitExample.getClassByName("Main")
                    .orElseThrow(() -> new AlgorithmQuestionResultException("Main class not found", example.getId()));

            MethodDeclaration mainMethodExample = new MethodDeclaration();
            mainMethodExample.setName("main");
            mainMethodExample.addModifier(Modifier.publicModifier().getKeyword());
            mainMethodExample.addModifier(Modifier.staticModifier().getKeyword());
            mainMethodExample.setType(void.class);
            mainMethodExample.addParameter("String[]", "args");

            BlockStmt mainMethodBodyExample = new BlockStmt();

            // Add necessary imports
            compilationUnitExample.addImport("java.util.*");
            compilationUnitExample.addImport("java.lang.System");

            // Create variables
            mainMethodBodyExample.addStatement("Main soln = new Main();");

            // Add parameters
            for (Map.Entry<String, Object> entry : example.getInputArguments().entrySet()) {
                String paramName = entry.getKey();
                String paramValue = entry.getValue().toString();
                mainMethodBodyExample.addStatement(String.format("var %s = %s;", paramName, paramValue));
            }

            // Add method call
            mainMethodBodyExample.addStatement(String.format("var actualResult = soln.%s(%s);", question.getMethodName(), String.join(",", example.getInputArguments().keySet())));

            StringBuilder conditionalStatement = new StringBuilder();
            conditionalStatement.append("if (actualResult.getClass().isArray()) {");
            conditionalStatement.append("    if (actualResult.getClass().getComponentType().isArray()) {"); // Check if it's a multi-dimensional array
            conditionalStatement.append("        System.out.println(\"IsCorrect = \" + Arrays.deepEquals((Object[]) actualResult, " + example.getOutput() + "));");
            conditionalStatement.append("    } else {");
            conditionalStatement.append("        System.out.println(\"IsCorrect = \" + Arrays.equals((Object[]) actualResult, " + example.getOutput() + "));"); // For single-dimensional arrays
            conditionalStatement.append("    }");
            conditionalStatement.append("    System.out.println(\"UserOutput = \" + Arrays.deepToString((Object[]) actualResult));");
            conditionalStatement.append("} else {");
            conditionalStatement.append("    System.out.println(\"IsCorrect = \" + actualResult.equals(" + example.getOutput() + "));");
            conditionalStatement.append("    System.out.println(\"UserOutput = \" + actualResult);");
            conditionalStatement.append("}");

            mainMethodBodyExample.addStatement(conditionalStatement.toString());


            mainMethodExample.setBody(mainMethodBodyExample);
            mainClass.addMember(mainMethodExample);

            allExamplesForCodeJudge.add(Pair.of(example, compilationUnitExample.toString()));
        }
        log.info("print statement {} {}", allExamplesForCodeJudge);
        return allExamplesForCodeJudge;
    }
}
