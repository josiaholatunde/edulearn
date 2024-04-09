package com.uol.finalproject.edulearn.apimodel;


import com.fasterxml.jackson.databind.JsonNode;
import com.uol.finalproject.edulearn.entities.AlgorithmQuestionExample;
import com.uol.finalproject.edulearn.entities.AlgorithmSolution;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmSolutionDTO {

    private Long id;
    private String description;

    private String code;

    private String timeComplexity;

    private String spaceComplexity;

    private String relevantResources;


    public static AlgorithmSolutionDTO fromAlgorithmSolution(AlgorithmSolution algorithmSolution) {
        AlgorithmSolutionDTO algorithmSolutionDTO = AlgorithmSolutionDTO.builder().build();
        BeanUtils.copyProperties(algorithmSolution, algorithmSolutionDTO);
        return algorithmSolutionDTO;
    }
}
