package com.uol.finalproject.edulearn.apimodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CodeJudgeRequest {


    @JsonProperty("language_id")
    private String languageId;

    @JsonProperty("source_code")
    private String sourceCode;


    public static CodeJudgeRequest fromSolutionCode(String userSolution, String languageId) {
        return CodeJudgeRequest.builder()
                .languageId(languageId)
                .sourceCode(userSolution)
                .build();
    }
}
