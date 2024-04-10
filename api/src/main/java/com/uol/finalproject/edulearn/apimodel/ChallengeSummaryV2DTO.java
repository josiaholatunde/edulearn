package com.uol.finalproject.edulearn.apimodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeSummaryV2DTO {

    private Long totalChallenges;
    private Long totalChallengesWon;
    private Long totalChallengesLost;
}
