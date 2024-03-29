package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.ChallengeDTO;
import com.uol.finalproject.edulearn.apimodel.ChallengeSubmissionDTO;
import com.uol.finalproject.edulearn.apimodel.request.ChallengeUserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ChallengeService {

    Page<ChallengeDTO> getChallenges(PageRequest pageRequest);


    ChallengeDTO getChallengeDetails(long challengeId);

    ChallengeSubmissionDTO saveChallengeQuestionResponses(ChallengeUserResponse challengeUserResponse) throws Exception;

    ChallengeDTO createChallenge(ChallengeDTO challengeDTO);
}
