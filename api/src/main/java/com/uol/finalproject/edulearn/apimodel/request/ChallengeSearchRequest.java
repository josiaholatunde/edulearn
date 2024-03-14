package com.uol.finalproject.edulearn.apimodel.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeSearchRequest {

    private int challengeId;

    private String title;
}
