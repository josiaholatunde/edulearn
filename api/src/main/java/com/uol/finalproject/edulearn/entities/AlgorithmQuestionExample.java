package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.uol.finalproject.edulearn.apimodel.AlgorithmQuestionDTO;
import com.uol.finalproject.edulearn.apimodel.AlgorithmQuestionExampleDTO;
import com.uol.finalproject.edulearn.converters.LinkedHashMapConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.LinkedHashMap;

@Entity(name = "algorithm_question_examples")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmQuestionExample extends BaseAuditableModel {

    private String input;

    private String output;
    private String explanation;

    @Column(name = "input_arguments")
    @Convert(converter = LinkedHashMapConverter.class)
    private LinkedHashMap<String, Object> inputArguments;

    @ManyToOne
    @JoinColumn(name = "algorithm_question_id", referencedColumnName = "id")
    @JsonIgnore
    private AlgorithmQuestion algorithmQuestion;

    public static AlgorithmQuestionExample fromQuestionExampleDTO(AlgorithmQuestionExampleDTO algorithmQuestionDTO) {
        AlgorithmQuestionExample algorithmQuestionExample = AlgorithmQuestionExample.builder().build();
        BeanUtils.copyProperties(algorithmQuestionDTO, algorithmQuestionExample);
        return algorithmQuestionExample;
    }

}
