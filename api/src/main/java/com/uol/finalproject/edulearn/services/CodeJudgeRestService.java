package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.CodeJudgeBatchResponse;

public interface CodeJudgeRestService {

    CodeJudgeBatchResponse executeCode(Object requestBody);
}
