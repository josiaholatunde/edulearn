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
public class MultipleChoiceOptionDTO {

    private String title;

    private String value;

    public static MultipleChoiceOptionDTO fromMultipleChoiceOption(MultipleChoiceOption multipleChoiceOption) {
        MultipleChoiceOptionDTO multipleChoiceOptionDTO = MultipleChoiceOptionDTO.builder().build();
        BeanUtils.copyProperties(multipleChoiceOption, multipleChoiceOptionDTO);
        return multipleChoiceOptionDTO;
    }
}
