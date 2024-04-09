package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.ChallengeDTO;
import com.uol.finalproject.edulearn.apimodel.ChallengeSubmissionDTO;
import com.uol.finalproject.edulearn.apimodel.ChallengeSummaryDTO;
import com.uol.finalproject.edulearn.apimodel.request.ChallengeUserResponse;
import com.uol.finalproject.edulearn.apimodel.specifications.ChallengeSpecificationSearchCriteria;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ChallengeService {

    Page<ChallengeDTO> getChallenges(ChallengeSpecificationSearchCriteria specificationSearchCriteria);


    ChallengeDTO getChallengeDetails(long challengeId);

    ChallengeSubmissionDTO saveChallengeQuestionResponses(ChallengeUserResponse challengeUserResponse) throws Exception;

    ChallengeDTO createChallenge(ChallengeDTO challengeDTO);

    ChallengeSummaryDTO getChallengesSummary();

    ChallengeDTO handleChallengeUpdate(long challengeId, ChallengeDTO challengeDTO);

    ChallengeDTO createChallengeAndQuestions(ChallengeDTO challengeDTO);
}
