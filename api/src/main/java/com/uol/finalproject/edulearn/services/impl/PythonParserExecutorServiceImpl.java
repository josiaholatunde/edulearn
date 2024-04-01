package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.entities.AlgorithmQuestion;
import com.uol.finalproject.edulearn.entities.AlgorithmQuestionExample;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class PythonParserExecutorServiceImpl {


    public List<Pair<AlgorithmQuestionExample, String>> appendMainMethodToUserSolutionInPython(AlgorithmQuestion question, String userSolution) throws Exception {
        List<Pair<AlgorithmQuestionExample, String>> allExamplesForCodeJudge = new ArrayList<>();

        // Iterate over examples
        for (AlgorithmQuestionExample example : question.getExamples()) {
            StringBuilder pythonCode = new StringBuilder(userSolution);

            // Append main method
            pythonCode.append("\n\n");
            pythonCode.append("if __name__ == '__main__':\n");
            pythonCode.append("    soln = Solution()\n");

            // Add input arguments
            for (Map.Entry<String, Object> entry : example.getInputArguments().entrySet()) {
                String paramName = entry.getKey();
                Object paramValue = entry.getValue();
                pythonCode.append(String.format("    %s = %s\n", paramName, paramValue));
            }

            // Add method call
            pythonCode.append(String.format("    actual_result = soln.%s(%s)\n", question.getMethodName(), String.join(", ", example.getInputArguments().keySet())));

            // Print output
            pythonCode.append("    print(f'IsCorrect = {actual_result == " + example.getOutput() + "}')\n");
            pythonCode.append("    print(f'UserOutput = {actual_result}')\n");

            allExamplesForCodeJudge.add(Pair.of(example, pythonCode.toString()));
        }

        return allExamplesForCodeJudge;
    }

}
