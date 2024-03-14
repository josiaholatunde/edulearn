package com.uol.finalproject.edulearn.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "algorithm_question_solutions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmSolution extends BaseAuditableModel {

    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "code", columnDefinition = "LONGTEXT")
    private String code;

    @Column(name = "time_complexity")
    private String timeComplexity;

    @Column(name = "space_complexity")
    private String spaceComplexity;

    @Column(name = "relevant_resources")
    private String relevantResources;

    @ManyToOne
    @JoinColumn(name = "algorithm_question_id", referencedColumnName = "id")
    private AlgorithmQuestion algorithmQuestion;
}
