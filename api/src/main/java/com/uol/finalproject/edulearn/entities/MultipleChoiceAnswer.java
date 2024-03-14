package com.uol.finalproject.edulearn.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "multiple_choice_answers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MultipleChoiceAnswer extends BaseAuditableModel {

    @ManyToOne
    @JoinColumn(name = "multiple_choice_question_id")
    private MultipleChoiceQuestion question;

    @OneToOne
    @JoinColumn(name = "option_id")
    private MultipleChoiceOption option;
}
