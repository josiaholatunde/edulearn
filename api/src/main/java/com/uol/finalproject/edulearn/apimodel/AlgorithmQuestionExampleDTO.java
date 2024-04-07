package com.uol.finalproject.edulearn.apimodel;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.LinkedHashMap;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmQuestionExampleDTO {

    private String input;

    private String output;
    private String explanation;

    private LinkedHashMap<String, Object> inputArguments;
}
