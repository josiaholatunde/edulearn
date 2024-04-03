package com.uol.finalproject.edulearn.apimodel.enums;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CodeJudgeResponseStatus {

    private long id;
    private String status;
}
