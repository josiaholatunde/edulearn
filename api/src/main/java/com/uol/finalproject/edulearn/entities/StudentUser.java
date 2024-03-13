package com.uol.finalproject.edulearn.entities;

import com.uol.finalproject.edulearn.apimodel.request.RegisterStudentUserDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

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

    @OneToOne(mappedBy = "studentUser")
    private User user;

    @OneToMany
    @Builder.Default
    private List<Challenge> challenges = new ArrayList<>();

    @OneToMany
    @Builder.Default
    private List<UserCertification> certifications = new ArrayList<>();

    public static StudentUser fromRegisterStudent(RegisterStudentUserDTO registerStudentUserDTO) {
        StudentUser studentUser = StudentUser.builder().build();
        BeanUtils.copyProperties(registerStudentUserDTO, studentUser);
        return studentUser;
    }


}
