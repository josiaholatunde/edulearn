package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.uol.finalproject.edulearn.entities.enums.ChallengeInviteStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "challenge_invitations")
public class ChallengeInvitation extends BaseAuditableModel {

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    @JsonIgnore
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "student_user_id")
    private StudentUser studentUser;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ChallengeInviteStatus status = ChallengeInviteStatus.PENDING;

}
