package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "user_social_profile")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSocialProfile extends BaseAuditableModel {

    private String linkedInUrl;
    private String githubUrl;
    private String twitterUrl;
    private String discordUrl;

    @OneToOne
    @JoinColumn(name = "student_user_id")
    @JsonIgnore
    private StudentUser studentUser;
}
