package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.ChallengeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ChallengeService {

    Page<ChallengeDTO> getChallenges(PageRequest pageRequest);


    ChallengeDTO getChallengeDetails(long challengeId);
}
