package com.uol.finalproject.edulearn.apimodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


public interface ChallengeSummaryDTO {

    Long getTotalChallenges();
   Long getChallengesWon();
    Long getChallengesLost();

}
