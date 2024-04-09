package com.uol.finalproject.edulearn.apimodel;


import com.fasterxml.jackson.databind.JsonNode;
import com.uol.finalproject.edulearn.entities.AlgorithmQuestion;
import com.uol.finalproject.edulearn.entities.AlgorithmQuestionExample;
import com.uol.finalproject.edulearn.entities.AlgorithmSolution;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmQuestionDTO {

    private Long id;
    private String introduction;
    private String inputDescription;
    private String outputDescription;
    private String pythonSampleCode;
    private String javascriptSampleCode;
    private String javaSampleCode;
    private String methodName;
    private JsonNode methodArguments;

    @Builder.Default
    private List<AlgorithmQuestionExampleDTO> examples = new ArrayList<>();

    @Builder.Default
    private List<AlgorithmSolutionDTO> solutions = new ArrayList<>();

    private String returnType;

    public static AlgorithmQuestionDTO fromAlgorithmQuestion(AlgorithmQuestion algorithmQuestion) {
        AlgorithmQuestionDTO algorithmQuestionDTO = AlgorithmQuestionDTO.builder().build();
        BeanUtils.copyProperties(algorithmQuestion, algorithmQuestionDTO);
        algorithmQuestionDTO.setExamples(algorithmQuestion.getExamples().stream()
                .map(AlgorithmQuestionExampleDTO::fromAlgorithmQuestionExample).collect(Collectors.toList()));
        algorithmQuestionDTO.setSolutions(algorithmQuestion.getSolutions().stream().map(AlgorithmSolutionDTO::fromAlgorithmSolution).collect(Collectors.toList()));
        return algorithmQuestionDTO;
    }
}
