package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "challenge_participants")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeParticipant extends BaseAuditableModel {

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    @JsonIgnore
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "student_user_id")
    private StudentUser studentUser;

}
