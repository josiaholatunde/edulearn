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


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public QuestionType getType() {
        return type;
    }

    public void setType(QuestionType type) {
        this.type = type;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getNoOfUsersLiked() {
        return noOfUsersLiked;
    }

    public void setNoOfUsersLiked(int noOfUsersLiked) {
        this.noOfUsersLiked = noOfUsersLiked;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<Challenge> getChallenges() {
        return challenges;
    }

    public void setChallenges(List<Challenge> challenges) {
        this.challenges = challenges;
    }

    public AlgorithmQuestion getAlgorithmQuestion() {
        return algorithmQuestion;
    }

    public void setAlgorithmQuestion(AlgorithmQuestion algorithmQuestion) {
        this.algorithmQuestion = algorithmQuestion;
    }

    public MultipleChoiceQuestion getMultipleChoiceQuestion() {
        return multipleChoiceQuestion;
    }

    public void setMultipleChoiceQuestion(MultipleChoiceQuestion multipleChoiceQuestion) {
        this.multipleChoiceQuestion = multipleChoiceQuestion;
    }
}
