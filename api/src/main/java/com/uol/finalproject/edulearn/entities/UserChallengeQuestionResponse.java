package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "user_multiple_choice_challenge_question_response")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class UserChallengeQuestionResponse extends BaseAuditableModel {

    @ManyToOne
    @JoinColumn(name = "challenge_submission_id")
    @JsonIgnore
    private ChallengeSubmission challengeSubmission;

    @ManyToOne
    private Question question;

    private boolean isCorrect;

}
