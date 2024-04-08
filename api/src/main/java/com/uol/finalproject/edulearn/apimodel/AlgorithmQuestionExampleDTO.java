package com.uol.finalproject.edulearn.apimodel;



import com.uol.finalproject.edulearn.entities.AlgorithmQuestionExample;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.LinkedHashMap;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmQuestionExampleDTO {

    private String input;

    private String output;
    private String explanation;

    @Builder.Default
    private LinkedHashMap<String, Object> inputArguments = new LinkedHashMap<>();

    public static AlgorithmQuestionExampleDTO fromAlgorithmQuestionExample(AlgorithmQuestionExample algorithmQuestionExample) {
        AlgorithmQuestionExampleDTO exampleDTO = AlgorithmQuestionExampleDTO.builder().build();
        BeanUtils.copyProperties(algorithmQuestionExample, exampleDTO);
        return exampleDTO;
    }
}
