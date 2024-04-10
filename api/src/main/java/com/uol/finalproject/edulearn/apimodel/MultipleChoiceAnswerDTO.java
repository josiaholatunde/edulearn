package com.uol.finalproject.edulearn.apimodel;


import com.uol.finalproject.edulearn.entities.MultipleChoiceAnswer;
import com.uol.finalproject.edulearn.entities.MultipleChoiceOption;
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
public class MultipleChoiceAnswerDTO {

    private Long id;
    private long optionId;
    private String optionTitle;

    private MultipleChoiceOption option;


    public static MultipleChoiceAnswerDTO fromMultipleChoiceAnswer(MultipleChoiceAnswer multipleChoiceAnswer) {
        MultipleChoiceAnswerDTO multipleChoiceAnswerDTO = MultipleChoiceAnswerDTO.builder().build();
        BeanUtils.copyProperties(multipleChoiceAnswer, multipleChoiceAnswerDTO);
        multipleChoiceAnswerDTO.setOption(multipleChoiceAnswer.getOption());
        return multipleChoiceAnswerDTO;
    }

}
