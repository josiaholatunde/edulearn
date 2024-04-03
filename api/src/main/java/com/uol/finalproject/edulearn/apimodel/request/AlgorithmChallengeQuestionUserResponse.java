package com.uol.finalproject.edulearn.apimodel.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmChallengeQuestionUserResponse {

    private long challengeId;

    private String codeSolution;
}
