package com.uol.finalproject.edulearn.entities;

import com.uol.finalproject.edulearn.entities.enums.RoleType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseAuditableModel {

    private String username;

    private String password;

    @Builder.Default
    private boolean isActive = true;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @OneToOne
    @JoinColumn(name = "student_user_id")
    private StudentUser studentUser;



}
