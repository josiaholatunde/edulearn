package com.uol.finalproject.edulearn.apimodel;


import com.uol.finalproject.edulearn.entities.MultipleChoiceAnswer;
import com.uol.finalproject.edulearn.entities.MultipleChoiceOption;
import com.uol.finalproject.edulearn.entities.MultipleChoiceQuestion;
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
public class MultipleChoiceQuestionDTO {

    private boolean hasMultipleAnswers;

    @Builder.Default
    private List<MultipleChoiceAnswerDTO> answerList = new ArrayList<>();
    private List<MultipleChoiceOptionDTO> options = new ArrayList<>();

    public static MultipleChoiceQuestionDTO fromMultipleChoiceQuestion(MultipleChoiceQuestion multipleChoiceQuestion) {
        MultipleChoiceQuestionDTO multipleChoiceQuestionDTO = MultipleChoiceQuestionDTO.builder().build();
        BeanUtils.copyProperties(multipleChoiceQuestion, multipleChoiceQuestionDTO);
        return multipleChoiceQuestionDTO;
    }
}
