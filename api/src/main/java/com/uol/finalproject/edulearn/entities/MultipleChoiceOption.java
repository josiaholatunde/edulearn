package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.uol.finalproject.edulearn.entities.enums.ChallengeType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "multiple_choice_question_options")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MultipleChoiceOption extends BaseAuditableModel {

    private String title;

    private String value;

    @ManyToOne
    @JoinColumn(name = "multiple_choice_question_id", referencedColumnName = "id")
    @JsonIgnore
    private MultipleChoiceQuestion question;
}
