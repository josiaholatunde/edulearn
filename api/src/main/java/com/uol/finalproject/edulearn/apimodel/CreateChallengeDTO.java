package com.uol.finalproject.edulearn.apimodel;


import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.MultipleChoiceOption;
import com.uol.finalproject.edulearn.entities.Question;
import com.uol.finalproject.edulearn.entities.enums.ChallengeParticipantType;
import com.uol.finalproject.edulearn.entities.enums.ChallengeStatus;
import com.uol.finalproject.edulearn.entities.enums.ChallengeType;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateChallengeDTO {

    private Long id;

    private String title;

    private String category;

    private ChallengeParticipantType participantType;

    private ChallengeType type;

    private String friendlyType;

    private int level;

    private Timestamp startDate;

    private Timestamp endDate;

    private long submissions;

    private long totalParticipants;

    private long totalInvitations;

    private RoleType createdBy;

    private StudentUserDTO studentUser;

    private ChallengeStatus challengeStatus;

    private List<QuestionDTO> challengeQuestions = new ArrayList<>();

    private List<Long> challengeUsers = new ArrayList<>();

    private Map<String, List<MultipleChoiceOption>> optionAnswers = new HashMap<>();


    public static CreateChallengeDTO fromChallenge(Challenge challenge) {
        CreateChallengeDTO challengeDTO = CreateChallengeDTO.builder().build();
        BeanUtils.copyProperties(challenge, challengeDTO);

        if (challenge.getStudentUser() != null) {
            StudentUserDTO studentUserDTO = StudentUserDTO.fromStudentUser(challenge.getStudentUser());
            challengeDTO.setStudentUser(studentUserDTO);
        }

        if (!challenge.getChallengeQuestions().isEmpty()) {
            if (ChallengeType.ALGORITHMS == challenge.getType()) {
                populateSampleProgrammingLanguages(challenge);
            }
//            challengeDTO.setChallengeQuestions(challenge.getChallengeQuestions());
        }
        return challengeDTO;
    }

    private static void populateSampleProgrammingLanguages(Challenge challenge) {
        return;
    }

}
