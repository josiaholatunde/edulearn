package com.uol.finalproject.edulearn.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "application_settings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationSetting extends BaseAuditableModel {

    @Column(name = "default_challenge_duration")
    private String defaultChallengeDuration;

    @Column(name = "challenge_rules")
    private String challengeRules;
}
