package com.uol.finalproject.edulearn.services.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.github.javaparser.JavaParser;
import com.github.javaparser.ParseResult;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.Modifier;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.body.TypeDeclaration;
import com.github.javaparser.ast.stmt.BlockStmt;
import com.google.gson.Gson;
import com.uol.finalproject.edulearn.entities.AlgorithmQuestion;
import com.uol.finalproject.edulearn.entities.AlgorithmQuestionExample;
import com.uol.finalproject.edulearn.exceptions.AlgorithmQuestionResultException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
@RequiredArgsConstructor
public class JavaParserExecutorServiceImpl {

    public List<Pair<AlgorithmQuestionExample, String>> appendMainMethodToUserSolution(AlgorithmQuestion question, String userSolution) throws Exception {
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
//            compilationUnitExample.addImport("java.lang.System");

            // Create variables
            mainMethodBodyExample.addStatement("Main soln = new Main();");

            // Add parameters
            for (Map.Entry<String, Object> entry : example.getInputArguments().entrySet()) {
                String paramName = entry.getKey();
                String parameterType = getInputArgumentType(paramName, question.getMethodArguments());
                String paramValue = entry.getValue().toString();
                if ("intArray".equals(parameterType)) {
                    paramValue = convertToIntArray(paramValue);
                } else if ("multiIntArray".equals(parameterType)) {
                    paramValue = convertToMultiDimensionalIntArray(paramValue);
                }
                mainMethodBodyExample.addStatement(String.format("var %s = %s;", paramName, paramValue));
            }

            String methodCall = String.format("Object actualResult = soln.%s(%s);", question.getMethodName(), String.join(", ", example.getInputArguments().keySet()));
            mainMethodBodyExample.addStatement(methodCall);

            // Conditional output based on the type of actualResult
            String outputHandling = generateOutputHandlingCode(example);
            mainMethodBodyExample.addStatement(outputHandling);

            mainMethodExample.setBody(mainMethodBodyExample);
            mainClass.addMember(mainMethodExample);

            allExamplesForCodeJudge.add(Pair.of(example, compilationUnitExample.toString()));
        }
        log.info("print statement {} {}", allExamplesForCodeJudge);
        return allExamplesForCodeJudge;
    }


    private String generateOutputHandlingCode(AlgorithmQuestionExample example) {
        StringBuilder builder = new StringBuilder();
        if ("multiIntArray".equals(example.getOutputType())) {
            String output = convertToMultiDimensionalObjectArray(example.getOutput());
            builder.append(" if (true) {  System.out.println(\"IsCorrect = \" + Arrays.deepEquals((Object[]) actualResult, new Object[]" + output + "));\n");
            builder.append("    System.out.println(\"UserOutput = \" + Arrays.deepToString((Object[]) actualResult));\n }");
        } else if ("intArray".equals(example.getOutputType())) {
            String output = convertToIntArray(example.getOutput());
            builder.append("if (true) {  int[] expectedOutput = (int[]) " + output + ";\n");
            builder.append("    System.out.println(\"IsCorrect = \" + Arrays.equals((int[]) actualResult, expectedOutput));\n");
            builder.append("    System.out.println(\"UserOutput = \" + Arrays.toString((int[]) actualResult));\n }");
        } else {
            builder.append("if (true) {\n");
            builder.append("    System.out.println(\"IsCorrect = \" + actualResult.equals(" + example.getOutput() + "));\n");
            builder.append("    System.out.println(\"UserOutput = \" + actualResult);\n");
            builder.append("}");
        }
        return builder.toString();
    }

    private String convertToIntArray(String input) {
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(input);

        int[] nums = matcher.results()
                .mapToInt(match -> Integer.parseInt(match.group()))
                .toArray();

        return "new int[] { " + Arrays.toString(nums).replaceAll("[\\[\\]]", "") + " }";
    }

    private String convertToMultiDimensionalIntArray(String input) {
        Gson gson = new Gson();
        int[][] result = gson.fromJson(input, int[][].class);
        StringBuilder sb = new StringBuilder();
        sb.append("new int[][] {");
        for (int i = 0; i < result.length; i++) {
            sb.append(" new int[] { ");
            for (int j = 0; j < result[i].length; j++) {
                sb.append(result[i][j]);
                if (j < result[i].length - 1) {
                    sb.append(", ");
                }
            }
            sb.append(" }");
            if (i < result.length - 1) {
                sb.append(", ");
            }
        }
        sb.append(" }");
        return sb.toString();
    }

    private String convertToMultiDimensionalObjectArray(String input) {
        Gson gson = new Gson();
        int[][] result = gson.fromJson(input, int[][].class);
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        for (int i = 0; i < result.length; i++) {
            sb.append(" new int[] { ");
            for (int j = 0; j < result[i].length; j++) {
                sb.append(result[i][j]);
                if (j < result[i].length - 1) {
                    sb.append(", ");
                }
            }
            sb.append(" }");
            if (i < result.length - 1) {
                sb.append(", ");
            }
        }
        sb.append(" }");
        return sb.toString();
    }

    private String getInputArgumentType(String paramName, JsonNode methodArguments) {
        if (methodArguments != null && methodArguments.isArray()) {
            for (JsonNode argument: methodArguments) {
                if (paramName.equals(argument.get("name").asText())) {
                    return argument.get("type").asText();
                }
            }
        }
        return null;
    }
}
