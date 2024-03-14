package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "algorithm_question_examples")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmQuestionExample extends BaseAuditableModel {

    private String input;

    private String output;
    private String explanation;

    @ManyToOne
    @JoinColumn(name = "algorithm_question_id", referencedColumnName = "id")
    @JsonIgnore
    private AlgorithmQuestion algorithmQuestion;

}
