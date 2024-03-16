package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.uol.finalproject.edulearn.entities.enums.ChallengeType;
import com.uol.finalproject.edulearn.entities.enums.QuestionType;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    @Builder.Default
    @Column(name = "no_of_users_liked")
    private int noOfUsersLiked = 0;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToMany(mappedBy = "challengeQuestions")
    @JsonIgnore
    private List<Challenge> challenges = new ArrayList<>();

    @OneToOne(mappedBy = "question")
    private AlgorithmQuestion algorithmQuestion;

    @OneToOne(mappedBy = "question")
    private MultipleChoiceQuestion multipleChoiceQuestion;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Question question = (Question) o;
        return level == question.level && noOfUsersLiked == question.noOfUsersLiked && Objects.equals(title, question.title) && Objects.equals(category, question.category) && type == question.type && Objects.equals(imageUrl, question.imageUrl) && Objects.equals(challenges, question.challenges) && Objects.equals(algorithmQuestion, question.algorithmQuestion) && Objects.equals(multipleChoiceQuestion, question.multipleChoiceQuestion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), title, category, type, level, noOfUsersLiked, imageUrl, challenges, algorithmQuestion, multipleChoiceQuestion);
    }
}
