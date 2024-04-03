package com.uol.finalproject.edulearn.apimodel;

import com.uol.finalproject.edulearn.entities.ChallengeParticipant;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.UserCertification;
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
public class ChallengeParticipantDTO {

    private long id;
    private String firstName;

    private String lastName;

    private String email;

    private int level;

    private String biography;
    private String location;
    private String skills;
    private String university;

    @Builder.Default
    private List<UserCertification> certifications = new ArrayList<>();

    private Timestamp createdAt;

    private Timestamp updatedAt;
    private Timestamp dateJoined;
    private String fullName;
    private String points;
    private boolean isUserLoggedIn;


    public static ChallengeParticipantDTO fromStudentUser(StudentUser studentUser, ChallengeParticipant challengeParticipant) {
        ChallengeParticipantDTO challengeParticipantDTO = ChallengeParticipantDTO.builder().build();
        BeanUtils.copyProperties(studentUser, challengeParticipantDTO);
        challengeParticipantDTO.setFullName(String.format("%s %s", studentUser.getFirstName(), studentUser.getLastName()));
        challengeParticipantDTO.setUserLoggedIn(studentUser.isUserLoginStatus());
        challengeParticipantDTO.setDateJoined(challengeParticipant.getUpdatedAt());
        return challengeParticipantDTO;
    }
}
