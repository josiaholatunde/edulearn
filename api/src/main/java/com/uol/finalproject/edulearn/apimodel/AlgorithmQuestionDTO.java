package com.uol.finalproject.edulearn.apimodel;


import com.fasterxml.jackson.databind.JsonNode;
import com.uol.finalproject.edulearn.entities.AlgorithmQuestionExample;
import com.uol.finalproject.edulearn.entities.AlgorithmSolution;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmQuestionDTO {

    private String introduction;
    private String inputDescription;
    private String outputDescription;
    private String pythonSampleCode;
    private String javascriptSampleCode;
    private String javaSampleCode;
    private String methodName;
    private JsonNode methodArguments;

    private List<AlgorithmQuestionExampleDTO> examples = new ArrayList<>();

    private List<AlgorithmSolutionDTO> solutions = new ArrayList<>();

    private String returnType;
}
