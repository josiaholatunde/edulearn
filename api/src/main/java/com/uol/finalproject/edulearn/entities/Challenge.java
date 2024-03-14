package com.uol.finalproject.edulearn.entities;

import com.uol.finalproject.edulearn.entities.enums.ChallengeParticipantType;
import com.uol.finalproject.edulearn.entities.enums.ChallengeType;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "challenges")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Challenge extends BaseAuditableModel {

    private String title;

    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name = "participant_type")
    private ChallengeParticipantType participantType;

    @Enumerated(EnumType.STRING)
    private ChallengeType type;

    private String friendlyType;

    private int level;

    private Timestamp startDate;

    private Timestamp endDate;

    private long submissions;

    @Column(name = "total_participants")
    private long totalParticipants;

    @Enumerated(EnumType.STRING)
    private RoleType createdBy;


    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private StudentUser studentUser;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "challenge_questions", joinColumns = @JoinColumn(name = "challenge_id"),
    inverseJoinColumns = @JoinColumn(name = "question_id"))
    private List<Question> challengeQuestions = new ArrayList<>();

}
