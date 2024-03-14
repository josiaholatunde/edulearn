package com.uol.finalproject.edulearn.apimodel;


import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.Question;
import com.uol.finalproject.edulearn.entities.enums.ChallengeParticipantType;
import com.uol.finalproject.edulearn.entities.enums.ChallengeType;
import com.uol.finalproject.edulearn.entities.enums.QuestionType;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {

    private String title;

    private String category;

    private QuestionType type;

    private int level;
}
