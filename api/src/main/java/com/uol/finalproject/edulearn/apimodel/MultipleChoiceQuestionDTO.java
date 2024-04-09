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
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MultipleChoiceQuestionDTO {

    private boolean hasMultipleAnswers;

    @Builder.Default
    private List<MultipleChoiceAnswerDTO> answerList = new ArrayList<>();

    @Builder.Default
    private List<MultipleChoiceAnswerDTO> answers = new ArrayList<>();
    private List<MultipleChoiceOptionDTO> options = new ArrayList<>();

    public static MultipleChoiceQuestionDTO fromMultipleChoiceQuestion(MultipleChoiceQuestion multipleChoiceQuestion) {
        MultipleChoiceQuestionDTO multipleChoiceQuestionDTO = MultipleChoiceQuestionDTO.builder().build();
        BeanUtils.copyProperties(multipleChoiceQuestion, multipleChoiceQuestionDTO);
        multipleChoiceQuestionDTO.setOptions(multipleChoiceQuestion.getOptions().stream().map(MultipleChoiceOptionDTO::fromMultipleChoiceOption).collect(Collectors.toList()));
        multipleChoiceQuestionDTO.setAnswers(multipleChoiceQuestion.getAnswers().stream().map(MultipleChoiceAnswerDTO::fromMultipleChoiceAnswer).collect(Collectors.toList()));
        return multipleChoiceQuestionDTO;
    }
}
