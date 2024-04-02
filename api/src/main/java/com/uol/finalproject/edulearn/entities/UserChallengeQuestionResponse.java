package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "questionResponse", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<UserChallengeAnswers> challengeAnswersList = new ArrayList<>();

}
