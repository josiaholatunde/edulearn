package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.uol.finalproject.edulearn.entities.enums.ChallengeType;
import com.uol.finalproject.edulearn.entities.enums.QuestionType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "questions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Question extends BaseAuditableModel {

    private String title;

    private String category;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @Builder.Default
    private int level = 10;

    @ManyToMany(mappedBy = "challengeQuestions")
    @JsonIgnore
    private List<Challenge> challenges = new ArrayList<>();

    @OneToOne(mappedBy = "question")
    private AlgorithmQuestion algorithmQuestion;

    @OneToOne(mappedBy = "question")
    private MultipleChoiceQuestion multipleChoiceQuestion;

}
