package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.ChallengeDTO;
import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.ChallengeRepository;
import com.uol.finalproject.edulearn.repositories.StudentUserRepository;
import com.uol.finalproject.edulearn.services.ChallengeService;
import com.uol.finalproject.edulearn.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChallengeServiceImpl implements ChallengeService  {


    private final ChallengeRepository challengeRepository;
    private final StudentUserRepository studentUserRepository;
    private final UserService userService;

    @Override
    public Page<ChallengeDTO> getChallenges(PageRequest pageRequest) {
        UserDetails userDetails = userService.getLoggedInUser();
        StudentUser studentUser = studentUserRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid user email"));
        Page<Challenge> challenges = challengeRepository
                .findAllByStudentUserAndLevelOrCreatedBy(studentUser, studentUser.getLevel(), RoleType.ADMIN, pageRequest);

        List<ChallengeDTO> challengesDTO = challenges
                .stream()
                .map(ChallengeDTO::fromChallenge)
                .collect(Collectors.toList());

        return new PageImpl<>(challengesDTO, pageRequest, challenges.getTotalElements());
    }

    public void createChallenge() {

    }


    @Override
    public ChallengeDTO getChallengeDetails(long challengeId) {

        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(() -> new ResourceNotFoundException("Challenge with id was not found"));
        return ChallengeDTO.fromChallenge(challenge);
    }
}
