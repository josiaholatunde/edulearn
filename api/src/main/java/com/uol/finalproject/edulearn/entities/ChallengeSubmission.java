package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "challenge_submissions")
@EqualsAndHashCode
public class ChallengeSubmission extends BaseAuditableModel {

    private float score;

    private int totalCorrect;

    private int totalQuestions;

    private String time;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    @JsonIgnore
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "student_user_id")
    private StudentUser studentUser;

    @OneToMany(mappedBy = "challengeSubmission", fetch = FetchType.EAGER)
    @Builder.Default
    private List<UserChallengeQuestionResponse> questionResponses = new ArrayList<>();

}
