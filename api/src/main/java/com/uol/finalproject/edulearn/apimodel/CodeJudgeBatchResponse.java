package com.uol.finalproject.edulearn.apimodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CodeJudgeBatchResponse {
    private List<CodeJudgeResponse> submissions;
}
