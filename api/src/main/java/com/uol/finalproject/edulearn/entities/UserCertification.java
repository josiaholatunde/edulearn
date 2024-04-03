package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity(name = "user_certifications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCertification extends BaseAuditableModel {

    private String name;

    @Column(name = "issuing_organization")
    private String issuingOrganization;

    @Column(name = "issue_date")
    private Timestamp issueDate;

    @Column(name = "expiration_date")
    private Timestamp expirationDate;

    @ManyToOne
    @JoinColumn(name = "student_user_id")
    @JsonIgnore
    private StudentUser studentUser;
}
