package com.uol.finalproject.edulearn.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "user_certifications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCertification extends BaseAuditableModel {

    private String name;

    @ManyToOne
    private StudentUser studentUser;
}
