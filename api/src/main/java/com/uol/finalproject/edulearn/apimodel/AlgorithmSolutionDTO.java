package com.uol.finalproject.edulearn.apimodel;


import com.fasterxml.jackson.databind.JsonNode;
import com.uol.finalproject.edulearn.entities.AlgorithmQuestionExample;
import com.uol.finalproject.edulearn.entities.AlgorithmSolution;
import jakarta.persistence.Column;
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
public class AlgorithmSolutionDTO {

    private String description;

    private String code;

    private String timeComplexity;

    private String spaceComplexity;

    private String relevantResources;
}
