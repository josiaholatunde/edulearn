package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.uol.finalproject.edulearn.apimodel.AlgorithmQuestionDTO;
import com.uol.finalproject.edulearn.apimodel.MethodArgument;
import com.uol.finalproject.edulearn.apimodel.MethodArgumentWrapper;
import com.uol.finalproject.edulearn.converters.JsonNodeConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "algorithm_questions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmQuestion extends BaseAuditableModel {

    @Column(name = "introduction", columnDefinition = "LONGTEXT")
    private String introduction;

    @Column(name = "input_description")
    private String inputDescription;

    @Column(name = "output_description")
    private String outputDescription;

    @Lob
    @Column(name = "python_sample_code", columnDefinition = "LONGTEXT")
    private String pythonSampleCode;

    @Lob
    @Column(name = "javascript_sample_code", columnDefinition = "LONGTEXT")
    private String javascriptSampleCode;

    @Lob
    @Column(name = "java_sample_code", columnDefinition = "LONGTEXT")
    private String javaSampleCode;

    @Column(name = "method_name")
    private String methodName;

    @Column(name = "method_arguments", columnDefinition = "json")
    @Convert(converter = JsonNodeConverter.class)
    private JsonNode methodArguments;

    @OneToOne
    @JoinColumn(name = "question_id")
    @JsonIgnore
    private Question question;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "algorithmQuestion", cascade = CascadeType.ALL)
    @Builder.Default
    private List<AlgorithmQuestionExample> examples = new ArrayList<>();


    @OneToMany(fetch = FetchType.EAGER, mappedBy = "algorithmQuestion", cascade = CascadeType.ALL)
    @Builder.Default
    private List<AlgorithmSolution> solutions = new ArrayList<>();

    private String returnType;


    public List<MethodArgument> parseJsonToMethodArguments() {
        ObjectMapper objectMapper = new ObjectMapper();
        MethodArgumentWrapper methodArgumentWrapper = objectMapper.convertValue(getMethodArguments(), MethodArgumentWrapper.class);
        return methodArgumentWrapper.getArguments();
    }

    public static AlgorithmQuestion fromAlgorithmQuestionDTO(AlgorithmQuestionDTO algorithmQuestionDTO) {
        AlgorithmQuestion algorithmQuestion = AlgorithmQuestion.builder().build();
        BeanUtils.copyProperties(algorithmQuestionDTO, algorithmQuestion);
        return algorithmQuestion;
    }
}
