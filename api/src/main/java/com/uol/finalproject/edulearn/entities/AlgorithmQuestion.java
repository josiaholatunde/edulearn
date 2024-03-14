package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @OneToOne
    @JoinColumn(name = "question_id")
    @JsonIgnore
    private Question question;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "algorithmQuestion")
    private List<AlgorithmQuestionExample> examples = new ArrayList<>();



}
