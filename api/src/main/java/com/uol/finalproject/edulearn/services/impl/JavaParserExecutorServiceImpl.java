package com.uol.finalproject.edulearn.services.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.github.javaparser.JavaParser;
import com.github.javaparser.ParseResult;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.Modifier;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.body.TypeDeclaration;
import com.github.javaparser.ast.stmt.BlockStmt;
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
            compilationUnitExample.addImport("java.lang.System");

            // Create variables
            mainMethodBodyExample.addStatement("Main soln = new Main();");

            // Add parameters
            for (Map.Entry<String, Object> entry : example.getInputArguments().entrySet()) {
                String paramName = entry.getKey();
                String parameterType = getInputArgumentType(paramName, question.getMethodArguments());
                String paramValue = entry.getValue().toString();
                if ("intArray".equals(parameterType)) {
                    paramValue = convertToIntArray(paramValue);
                }
                mainMethodBodyExample.addStatement(String.format("var %s = %s;", paramName, paramValue));
            }

            // Add method call
            mainMethodBodyExample.addStatement(String.format("var actualResult = soln.%s(%s);", question.getMethodName(), String.join(",", example.getInputArguments().keySet())));

            StringBuilder conditionalStatement = new StringBuilder();
            conditionalStatement.append("if (actualResult.getClass().isArray()) {");
            conditionalStatement.append("  if (actualResult.getClass().getComponentType().isPrimitive()) {");
            conditionalStatement.append("    int[] expectedOutput = (int[])" + example.getOutput() + ";");
            conditionalStatement.append("    System.out.println(\"IsCorrect = \" + Arrays.equals(actualResult, expectedOutput));");
            conditionalStatement.append("  } else {");
            conditionalStatement.append("    System.out.println(\"IsCorrect = \" + Arrays.deepEquals((Object[]) actualResult," + example.getOutput()+ "));");
            conditionalStatement.append("  }");
            conditionalStatement.append("  System.out.println(\"UserOutput = \" + Arrays.deepToString((Object[]) actualResult));");
            conditionalStatement.append("} else {");
            conditionalStatement.append("    System.out.println(\"IsCorrect = \" + actualResult.equals(" + example.getOutput() + "));");
            conditionalStatement.append("  System.out.println(\"UserOutput = \" + actualResult);");
            conditionalStatement.append("}");

            mainMethodBodyExample.addStatement(conditionalStatement.toString());


            mainMethodExample.setBody(mainMethodBodyExample);
            mainClass.addMember(mainMethodExample);

            allExamplesForCodeJudge.add(Pair.of(example, compilationUnitExample.toString()));
        }
        log.info("print statement {} {}", allExamplesForCodeJudge);
        return allExamplesForCodeJudge;
    }

    private String convertToIntArray(String input) {
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(input);

        int[] nums = matcher.results()
                .mapToInt(match -> Integer.parseInt(match.group()))
                .toArray();

        return "new int[] { " + Arrays.toString(nums).replaceAll("[\\[\\]]", "") + " }";
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
