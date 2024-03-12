package com.uol.finalproject.edulearn.entities;

import com.uol.finalproject.edulearn.entities.enums.ChallengeType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "questions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Question extends BaseAuditableModel {

    private String title;

    private String category;

    @Enumerated(EnumType.STRING)
    private ChallengeType type;

    private Timestamp startDate;

    private Timestamp endDate;

    private long submissions;

    private int level;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private StudentUser studentUser;

    @ManyToMany(mappedBy = "challengeQuestions")
    private List<Challenge> challenges = new ArrayList<>();



}
