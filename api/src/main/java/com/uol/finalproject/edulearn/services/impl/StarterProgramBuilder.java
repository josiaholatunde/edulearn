package com.uol.finalproject.edulearn.services.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.uol.finalproject.edulearn.entities.AlgorithmQuestion;
import org.springframework.stereotype.Component;

@Component
public class StarterProgramBuilder {


    public String buildJavaSampleCode(AlgorithmQuestion algorithmQuestion) {
        StringBuilder stringBuilder = new StringBuilder("class Main {\n");

        if (algorithmQuestion != null) {
            // Get method name and return type
            String methodName = algorithmQuestion.getMethodName();
            String returnType = algorithmQuestion.getReturnType();

            // Append method signature
            stringBuilder.append("    ").append(returnType).append(" ").append(methodName).append("(");

            // Append method arguments
            JsonNode methodArguments = algorithmQuestion.getMethodArguments();
            if (methodArguments != null && methodArguments.isArray()) {
                for (JsonNode arg : methodArguments) {
                    String argName = arg.get("name").asText();
                    String argType = arg.get("type").asText();
                    stringBuilder.append(argType).append(" ").append(argName).append(", ");
                }
                // Remove the last comma and space
                stringBuilder.delete(stringBuilder.length() - 2, stringBuilder.length());
            }
            stringBuilder.append(") {\n");
            stringBuilder.append("        // Add your implementation here\n");
            stringBuilder.append("    }\n");
        }

        stringBuilder.append("}");
        return stringBuilder.toString();
    }
}
