package com.uol.finalproject.edulearn.apimodel;


import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.ChallengeInvitation;
import com.uol.finalproject.edulearn.entities.Question;
import com.uol.finalproject.edulearn.entities.enums.ChallengeInviteStatus;
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
public class ChallengeInviteDTO {

    private Long id;

    private String title;

    private String category;

    private ChallengeType type;

    private String friendlyType;

    private String createdBy;

    private StudentUserDTO studentUser;

    private ChallengeInviteStatus status;

    private Timestamp createdAt;


    public static ChallengeInviteDTO fromChallengeInvitation(ChallengeInvitation challengeInvitation) {
        ChallengeInviteDTO challengeDTO = ChallengeInviteDTO.builder().build();
        BeanUtils.copyProperties(challengeInvitation, challengeDTO);
        challengeDTO.setTitle(challengeInvitation.getChallenge().getTitle());
        challengeDTO.setCategory(challengeInvitation.getChallenge().getCategory());
        challengeDTO.setFriendlyType(challengeInvitation.getChallenge().getFriendlyType());
        challengeDTO.setType(challengeInvitation.getChallenge().getType());
        challengeDTO.setCreatedBy(challengeInvitation.getChallenge().getStudentUser().getFullName());
        challengeDTO.setStatus(challengeInvitation.getStatus());

        if (challengeInvitation.getStudentUser() != null) {
            StudentUserDTO studentUserDTO = StudentUserDTO.fromStudentUser(challengeInvitation.getStudentUser());
            challengeDTO.setStudentUser(studentUserDTO);
        }
        return challengeDTO;
    }

}
