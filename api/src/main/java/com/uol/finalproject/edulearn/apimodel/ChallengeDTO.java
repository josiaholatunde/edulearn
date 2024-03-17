package com.uol.finalproject.edulearn.apimodel;


import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.Question;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.enums.ChallengeParticipantType;
import com.uol.finalproject.edulearn.entities.enums.ChallengeType;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import jakarta.persistence.*;
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
public class ChallengeDTO {

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

    private RoleType createdBy;

    private StudentUserDTO studentUser;

    private List<Question> challengeQuestions = new ArrayList<>();

    private List<Long> challengeUsers = new ArrayList<>();


    public static ChallengeDTO fromChallenge(Challenge challenge) {
        ChallengeDTO challengeDTO = ChallengeDTO.builder().build();
        BeanUtils.copyProperties(challenge, challengeDTO);

        if (challenge.getStudentUser() != null) {
            StudentUserDTO studentUserDTO = StudentUserDTO.fromStudentUser(challenge.getStudentUser());
            challengeDTO.setStudentUser(studentUserDTO);
        }

        if (!challenge.getChallengeQuestions().isEmpty()) {
            challengeDTO.setChallengeQuestions(challenge.getChallengeQuestions());
        }
        return challengeDTO;
    }

}
