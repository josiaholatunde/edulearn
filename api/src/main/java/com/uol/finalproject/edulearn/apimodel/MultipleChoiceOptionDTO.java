package com.uol.finalproject.edulearn.apimodel;


import com.uol.finalproject.edulearn.entities.MultipleChoiceAnswer;
import com.uol.finalproject.edulearn.entities.enums.QuestionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MultipleChoiceOptionDTO {

    private Long id;
    private String title;

    private String category;

    private QuestionType type;

    private int level;

    @Builder.Default
    private List<MultipleChoiceAnswer> answerList = new ArrayList<>();
}
