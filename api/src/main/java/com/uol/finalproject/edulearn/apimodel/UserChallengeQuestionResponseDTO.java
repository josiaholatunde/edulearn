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

    private long id;

    private ChallengeSubmissionDTO challengeSubmission;

    private QuestionDTO question;

    private boolean isCorrect;

    public static UserChallengeQuestionResponseDTO fromChallengeQuestionResponse(UserChallengeQuestionResponse challengeQuestionResponse) {
        UserChallengeQuestionResponseDTO userChallengeQuestionResponseDTO = UserChallengeQuestionResponseDTO.builder().build();
        BeanUtils.copyProperties(challengeQuestionResponse, userChallengeQuestionResponseDTO);
        return userChallengeQuestionResponseDTO;
    }
}
