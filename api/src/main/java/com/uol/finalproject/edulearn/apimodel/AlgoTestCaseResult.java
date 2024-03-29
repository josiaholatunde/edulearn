package com.uol.finalproject.edulearn.apimodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AlgoTestCaseResult {

    private long testCaseId;
    private String userOutput;
    private String expectedOutput;
    private boolean isTestCasePassed;
    private String compilationError;
}
