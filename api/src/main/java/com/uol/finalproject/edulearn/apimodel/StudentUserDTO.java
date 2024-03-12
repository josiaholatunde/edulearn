package com.uol.finalproject.edulearn.apimodel;

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
public class StudentUserDTO {

    private String firstName;

    private String lastName;

    private String email;

    private int level;

    private String biography;
    private String location;
    private String skills;
    private String university;
    private List<UserCertification> certifications = new ArrayList<>();

    private Timestamp createdAt;

    private Timestamp updatedAt;


    public static StudentUserDTO fromStudentUser(StudentUser studentUser) {
        StudentUserDTO studentUserDTO = StudentUserDTO.builder().build();
        BeanUtils.copyProperties(studentUser, studentUserDTO);
        return studentUserDTO;
    }
}
