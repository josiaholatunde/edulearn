package com.uol.finalproject.edulearn.apimodel;

import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.UserCertification;
import com.uol.finalproject.edulearn.entities.UserSocialProfile;
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
public class StudentUserDTO {

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
    private UserSocialProfile socialProfile;

    private Timestamp createdAt;

    private Timestamp updatedAt;
    private String fullName;
    private String points;
    private boolean isUserLoggedIn;
    private String imageUrl;


    public static StudentUserDTO fromStudentUser(StudentUser studentUser) {
        StudentUserDTO studentUserDTO = StudentUserDTO.builder().build();
        BeanUtils.copyProperties(studentUser, studentUserDTO);
        studentUserDTO.setFullName(String.format("%s %s", studentUserDTO.firstName, studentUserDTO.lastName));
        studentUserDTO.setUserLoggedIn(studentUser.isUserLoginStatus());
        studentUserDTO.setPoints(String.valueOf(studentUser.getPoints()));
        return studentUserDTO;
    }
}
