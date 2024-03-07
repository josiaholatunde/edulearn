package com.uol.finalproject.edulearn.entities;

import com.uol.finalproject.edulearn.apimodel.request.RegisterStudentUserDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.time.LocalDate;

@Entity
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

    @Column(name = "student_no")
    private String studentNo;

    public static StudentUser fromRegisterStudent(RegisterStudentUserDTO registerStudentUserDTO) {
        StudentUser studentUser = StudentUser.builder().build();
        BeanUtils.copyProperties(registerStudentUserDTO, studentUser);
        return studentUser;
    }
}
