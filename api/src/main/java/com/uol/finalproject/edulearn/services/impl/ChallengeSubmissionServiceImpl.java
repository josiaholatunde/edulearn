package com.uol.finalproject.edulearn.services.impl;


import com.uol.finalproject.edulearn.apimodel.ChallengeSubmissionDTO;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.ChallengeSubmissionRepository;
import com.uol.finalproject.edulearn.services.ChallengeSubmissionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChallengeSubmissionServiceImpl implements ChallengeSubmissionService {

    private final ChallengeSubmissionRepository challengeSubmissionRepository;


    @Override
    public ChallengeSubmissionDTO getChallengeSubmission(long challengeSubmissionId) {
        return ChallengeSubmissionDTO.fromChallengeSubmission(challengeSubmissionRepository
                .findById(challengeSubmissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Challenge submission id not found")));
    }
}
