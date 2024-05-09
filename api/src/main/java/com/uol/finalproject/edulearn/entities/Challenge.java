package com.uol.finalproject.edulearn.entities;

import com.uol.finalproject.edulearn.entities.enums.ChallengeParticipantType;
import com.uol.finalproject.edulearn.entities.enums.ChallengeStatus;
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

@Entity
@Table(name = "challenges")
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

    private Long duration;

    private long submissions;

    @Column(name = "total_participants")
    private long totalParticipants;

    @Column(name = "total_invitations")
    private long totalInvitations;

    @Enumerated(EnumType.STRING)
    private RoleType createdBy;

    @Builder.Default
    @Lob
    @Enumerated(EnumType.STRING)
    @Column(name = "challenge_status", columnDefinition = "LONGTEXT")
    private ChallengeStatus challengeStatus = ChallengeStatus.NOT_STARTED;


    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private StudentUser studentUser;

    @Column(name = "winner_status_decided", columnDefinition = "BOOLEAN DEFAULT false")
    private boolean winnerStatusDecided;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.ALL })
    @JoinTable(name = "challenge_questions", joinColumns = @JoinColumn(name = "challenge_id"),
    inverseJoinColumns = @JoinColumn(name = "question_id"))
    @Builder.Default
    private List<Question> challengeQuestions = new ArrayList<>();

    @OneToMany(mappedBy = "challenge")
    private List<ChallengeSubmission> challengeSubmissions = new ArrayList<>();


    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    @Builder.Default
    private List<ChallengeParticipant> challengeParticipants = new ArrayList<>();

    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    @Builder.Default
    private List<ChallengeInvitation> challengeInvitations = new ArrayList<>();

}
