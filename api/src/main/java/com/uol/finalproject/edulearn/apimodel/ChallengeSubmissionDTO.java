package com.uol.finalproject.edulearn.apimodel;


import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.ChallengeSubmission;
import com.uol.finalproject.edulearn.entities.Question;
import com.uol.finalproject.edulearn.entities.enums.ChallengeParticipantType;
import com.uol.finalproject.edulearn.entities.enums.ChallengeType;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeSubmissionDTO {

    private float score;

    private int totalCorrect;

    private int totalQuestions;

    @Builder.Default
    private List<AlgoTestCaseResult> algoResult = new ArrayList<>();


    public static ChallengeSubmissionDTO fromChallengeSubmission(ChallengeSubmission challengeSubmission) {
        ChallengeSubmissionDTO challengeSubmissionDTO = ChallengeSubmissionDTO.builder().build();
        BeanUtils.copyProperties(challengeSubmission, challengeSubmissionDTO);
        return challengeSubmissionDTO;
    }

}
