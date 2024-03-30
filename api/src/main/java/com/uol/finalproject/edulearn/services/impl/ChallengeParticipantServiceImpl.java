package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.ChallengeInviteDTO;
import com.uol.finalproject.edulearn.apimodel.ChallengeParticipantDTO;
import com.uol.finalproject.edulearn.apimodel.StudentUserDTO;
import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.ChallengeParticipant;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.ChallengeParticipantRepository;
import com.uol.finalproject.edulearn.repositories.ChallengeRepository;
import com.uol.finalproject.edulearn.repositories.StudentUserRepository;
import com.uol.finalproject.edulearn.services.ChallengeParticipantService;
import com.uol.finalproject.edulearn.services.StudentUserService;
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
public class ChallengeParticipantServiceImpl implements ChallengeParticipantService {
    private final ChallengeRepository challengeRepository;
    private final ChallengeParticipantRepository challengeParticipantRepository;


    @Override
    public Page<ChallengeParticipantDTO> getChallengeParticipants(long challengeId, PageRequest pageRequest) {

        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(() -> new ResourceNotFoundException("Challenge with id was not found"));

        Page<ChallengeParticipant> challengeParticipantPage = challengeParticipantRepository.findAllByChallenge(challenge, pageRequest);
        List<ChallengeParticipantDTO> challengeParticipants = challengeParticipantPage
                .map(challengeParticipant -> ChallengeParticipantDTO.fromStudentUser(challengeParticipant.getStudentUser(), challengeParticipant))
                .stream().collect(Collectors.toList());

        return new PageImpl<>(challengeParticipants, pageRequest, challengeParticipantPage.getTotalElements());
    }
}
