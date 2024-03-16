package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.uol.finalproject.edulearn.entities.enums.ChallengeType;
import com.uol.finalproject.edulearn.entities.enums.QuestionType;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity(name = "multiple_choice_questions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class MultipleChoiceQuestion extends BaseAuditableModel {

    private boolean hasMultipleAnswers;

    @OneToOne
    @JoinColumn(name = "question_id")
    @JsonIgnore
    private Question question;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "question")
    private List<MultipleChoiceOption> options = new ArrayList<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "question")
    @JsonIgnore
    private List<MultipleChoiceAnswer> answers = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        MultipleChoiceQuestion that = (MultipleChoiceQuestion) o;
        return hasMultipleAnswers == that.hasMultipleAnswers && Objects.equals(question, that.question) && Objects.equals(options, that.options) && Objects.equals(answers, that.answers);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), hasMultipleAnswers, question, options, answers);
    }
}
