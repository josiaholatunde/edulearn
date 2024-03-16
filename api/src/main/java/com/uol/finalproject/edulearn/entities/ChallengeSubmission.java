package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "challenge_submissions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeSubmission extends BaseAuditableModel {

    private float score;

    private int totalCorrect;

    private int totalQuestions;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    @JsonIgnore
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "student_user_id")
    private StudentUser studentUser;

}
