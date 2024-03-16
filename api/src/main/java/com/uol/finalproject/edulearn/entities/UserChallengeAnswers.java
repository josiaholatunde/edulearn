package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "user_multiple_choice_challenge_answers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserChallengeAnswers extends BaseAuditableModel {

    @ManyToOne
    @JoinColumn(name = "challenge_submission_id")
    @JsonIgnore
    private ChallengeSubmission challengeSubmission;

    @ManyToOne
    private Question question;

    @ManyToOne
    private MultipleChoiceOption option;

}
