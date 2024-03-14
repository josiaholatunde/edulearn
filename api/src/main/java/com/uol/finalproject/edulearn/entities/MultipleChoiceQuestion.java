package com.uol.finalproject.edulearn.entities;

import com.uol.finalproject.edulearn.entities.enums.ChallengeType;
import com.uol.finalproject.edulearn.entities.enums.QuestionType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "multiple_choice_questions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MultipleChoiceQuestion extends BaseAuditableModel {

    private boolean hasMultipleAnswers;

    @OneToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @OneToMany
    private List<MultipleChoiceOption> options = new ArrayList<>();

}
