package com.uol.finalproject.edulearn.apimodel;

import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.User;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private String username;

    private boolean isActive;

    private RoleType roleType;

    private StudentUserDTO studentUser;

    private Timestamp createdAt;

    private Timestamp updatedAt;

    public static UserDTO fromUser(User user) {
        StudentUserDTO studentUserDTO = StudentUserDTO.builder().build();
        BeanUtils.copyProperties(user.getStudentUser(), studentUserDTO);
        UserDTO userDTO = UserDTO.builder().build();
        BeanUtils.copyProperties(user, userDTO);
        userDTO.setStudentUser(studentUserDTO);
        return userDTO;
    }
}
