package com.uol.finalproject.edulearn.apimodel;


import com.uol.finalproject.edulearn.entities.*;
import com.uol.finalproject.edulearn.entities.enums.QuestionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {

    private Long id;
    private String title;

    private String category;

    private QuestionType type;

    private String difficultyLevel;

    private int level;
    private int noOfUsersLiked = 0;

    private MultipleChoiceQuestionDTO multipleChoiceQuestion;
    private AlgorithmQuestionDTO algorithmQuestion;

    @Builder.Default
    private List<MultipleChoiceAnswer> answerList = new ArrayList<>();


    public static QuestionDTO fromQuestion(Question question) {
        QuestionDTO questionDTO = QuestionDTO.builder().build();
        BeanUtils.copyProperties(question, questionDTO);
        return questionDTO;
    }
}
