package com.uol.finalproject.edulearn.apimodel;


import com.uol.finalproject.edulearn.entities.UserChallengeQuestionResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserChallengeQuestionResponseDTO {

    private Long id;

    private ChallengeSubmissionDTO challengeSubmission;

    private QuestionDTO question;

    private boolean isCorrect;

    public static UserChallengeQuestionResponseDTO fromChallengeQuestionResponse(UserChallengeQuestionResponse challengeQuestionResponse) {
        UserChallengeQuestionResponseDTO userChallengeQuestionResponseDTO = UserChallengeQuestionResponseDTO.builder().build();
        BeanUtils.copyProperties(challengeQuestionResponse, userChallengeQuestionResponseDTO);
        QuestionDTO questionDTO = QuestionDTO.builder()
                .answerList(challengeQuestionResponse.getQuestion().getMultipleChoiceQuestion().getAnswers())
                .build();
        BeanUtils.copyProperties(challengeQuestionResponse.getQuestion(), questionDTO);
        userChallengeQuestionResponseDTO.setQuestion(questionDTO);
        return userChallengeQuestionResponseDTO;
    }
}
