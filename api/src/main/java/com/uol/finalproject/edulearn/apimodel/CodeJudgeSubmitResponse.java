package com.uol.finalproject.edulearn.apimodel;

import com.uol.finalproject.edulearn.apimodel.enums.CodeJudgeResponseStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CodeJudgeSubmitResponse {

    private String token;

}
