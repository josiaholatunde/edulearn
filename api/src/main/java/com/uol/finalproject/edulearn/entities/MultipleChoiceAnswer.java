package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "multiple_choice_answers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class MultipleChoiceAnswer extends BaseAuditableModel {

    @ManyToOne
    @JoinColumn(name = "multiple_choice_question_id")
    @JsonIgnore
    private MultipleChoiceQuestion question;

    @OneToOne
    @JoinColumn(name = "option_id")
    private MultipleChoiceOption option;
}
