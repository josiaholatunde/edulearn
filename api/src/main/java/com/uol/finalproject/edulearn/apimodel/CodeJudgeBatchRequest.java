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
public class CodeJudgeBatchRequest {

    private List<CodeJudgeRequest> submissions;
}
