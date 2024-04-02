package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.entities.AlgorithmQuestion;
import com.uol.finalproject.edulearn.entities.AlgorithmQuestionExample;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class JavascriptParserExecutorServiceImpl {


    public List<Pair<AlgorithmQuestionExample, String>> appendMainMethodToUserSolution(AlgorithmQuestion question, String userSolution) {
        List<Pair<AlgorithmQuestionExample, String>> allExamplesForCodeJudge = new ArrayList<>();

        // Iterate over examples
        for (AlgorithmQuestionExample example : question.getExamples()) {
            StringBuilder javaScriptCode = new StringBuilder(userSolution);

            javaScriptCode.append("\n\n");
            javaScriptCode.append("const result = ").append(question.getMethodName()).append("(");

            for (Iterator<Map.Entry<String, Object>> it = example.getInputArguments().entrySet().iterator(); it.hasNext();) {
                Map.Entry<String, Object> entry = it.next();
                String paramName = entry.getKey();
                Object paramValue = entry.getValue();
                javaScriptCode.append(paramValue);
                if (it.hasNext()) {
                    javaScriptCode.append(", ");
                }
            }
            javaScriptCode.append(");\n");

            javaScriptCode.append("const expected = ").append(example.getOutput()).append(";\n");
            javaScriptCode.append("console.log('IsCorrect = ', JSON.stringify(result) === JSON.stringify(expected));\n");
            javaScriptCode.append("console.log('UserOutput = ', result);\n");

            allExamplesForCodeJudge.add(Pair.of(example, javaScriptCode.toString()));
        }

        return allExamplesForCodeJudge;
    }


}
