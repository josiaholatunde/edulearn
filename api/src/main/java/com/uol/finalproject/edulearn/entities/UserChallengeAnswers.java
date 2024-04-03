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
    @JoinColumn(name = "challenge_question_response_id")
    @JsonIgnore
    private UserChallengeQuestionResponse questionResponse;

    @ManyToOne
    private MultipleChoiceOption option;
}
