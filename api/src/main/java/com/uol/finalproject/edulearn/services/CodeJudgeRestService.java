package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.CodeJudgeBatchResponse;
import com.uol.finalproject.edulearn.apimodel.CodeJudgeSubmitResponse;

import java.util.List;

public interface CodeJudgeRestService {

    List<CodeJudgeSubmitResponse> executeCode(Object requestBody) throws Exception;

    CodeJudgeBatchResponse getSubmissionsBatch(String suffixUrl) throws Exception;
}
