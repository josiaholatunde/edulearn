package com.uol.finalproject.edulearn.apimodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.uol.finalproject.edulearn.apimodel.enums.CodeJudgeResponseStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CodeJudgeResponse {

    private String stdout;
    private String stderr;
    @JsonProperty("compile_output")
    private String compileOutput;
    private String time;
    private long memory;
    private String token;
    private CodeJudgeResponseStatus status;

}
