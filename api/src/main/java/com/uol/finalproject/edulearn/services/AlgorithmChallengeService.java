package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.ChallengeSubmissionDTO;
import com.uol.finalproject.edulearn.apimodel.request.ChallengeUserResponse;
import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.ChallengeSubmission;

public interface AlgorithmChallengeService {

    ChallengeSubmissionDTO saveChallengeQuestionResponses(ChallengeSubmission challengeSubmission, Challenge challenge, ChallengeUserResponse challengeUserResponse);
}
