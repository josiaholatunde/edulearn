package com.uol.finalproject.edulearn.entities;

import com.uol.finalproject.edulearn.apimodel.request.RegisterStudentUserDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "student_users")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentUser extends BaseAuditableModel {

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;

    @Builder.Default
    private int level = 10;

    private String biography;
    private String location;
    private String skills;
    private String university;

    @Column(name = "is_logged_in")
    @Builder.Default
    private boolean userLoginStatus = false;

    @Column(name = "last_logged_in_at")
    private Timestamp lastLoggedInAt;

    @Builder.Default
    private long points = Long.valueOf(100);

    @OneToOne(mappedBy = "studentUser")
    private User user;

    @OneToOne(mappedBy = "studentUser", cascade = CascadeType.ALL)
    private UserSocialProfile socialProfile;

    @OneToMany
    @Builder.Default
    private List<Challenge> challenges = new ArrayList<>();

    @OneToMany(mappedBy = "studentUser", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<UserCertification> certifications = new ArrayList<>();

    public static StudentUser fromRegisterStudent(RegisterStudentUserDTO registerStudentUserDTO) {
        StudentUser studentUser = StudentUser.builder().build();
        BeanUtils.copyProperties(registerStudentUserDTO, studentUser);
        return studentUser;
    }

    public String getFullName() {
        return String.format("%s %s", firstName, lastName);
    }


}
