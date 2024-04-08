package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.ChallengeInviteDTO;
import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.ChallengeInvitation;
import com.uol.finalproject.edulearn.entities.ChallengeParticipant;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.enums.ChallengeInviteStatus;
import com.uol.finalproject.edulearn.entities.enums.ChallengeStatus;
import com.uol.finalproject.edulearn.exceptions.BadRequestException;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.ChallengeInviteRepository;
import com.uol.finalproject.edulearn.repositories.ChallengeParticipantRepository;
import com.uol.finalproject.edulearn.repositories.StudentUserRepository;
import com.uol.finalproject.edulearn.services.ChallengeInviteService;
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
@Slf4j
@RequiredArgsConstructor
public class ChallengeInviteServiceImpl implements ChallengeInviteService {

    private final UserService userService;
    private final StudentUserRepository studentUserRepository;
    private final ChallengeInviteRepository challengeInviteRepository;
    private final ChallengeParticipantRepository challengeParticipantRepository;

    @Override
    public Page<ChallengeInviteDTO> getInvites(PageRequest pageRequest, ChallengeInviteStatus inviteStatus) {
        UserDetails userDetails = userService.getLoggedInUser();
        StudentUser studentUser = studentUserRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid user email"));
        Page<ChallengeInvitation> challengeInvitations = null;
        if (inviteStatus != null) {
            challengeInvitations = challengeInviteRepository.findAllByStudentUserAndStatusInOrderByIdDesc(studentUser, List.of(inviteStatus), pageRequest);
        } else {
            challengeInvitations = challengeInviteRepository
                    .findAllByStudentUserOrderByIdDesc(studentUser, pageRequest);
        }
        List<ChallengeInviteDTO> challengesDTO = challengeInvitations
                .stream()
                .map(ChallengeInviteDTO::fromChallengeInvitation)
                .collect(Collectors.toList());

        return new PageImpl<>(challengesDTO, pageRequest, challengeInvitations.getTotalElements());
    }

    @Override
    public ChallengeInviteDTO updateChallengeInvite(ChallengeInviteDTO challengeInviteDTO) {
        ChallengeInvitation challengeInvitation = challengeInviteRepository.findById(challengeInviteDTO.getId()).orElseThrow(() -> new ResourceNotFoundException("Invalid challenge invite id"));
        if (challengeInvitation.getStatus() == ChallengeInviteStatus.EXPIRED) throw new BadRequestException("Challenge invite has expired");
        if (challengeInvitation.getChallenge().getChallengeStatus() == ChallengeStatus.COMPLETED) {
            throw new BadRequestException("Challenge has been completed");
        } else if (challengeInvitation.getChallenge().getChallengeStatus() == ChallengeStatus.CANCELLED) {
            throw new BadRequestException("Challenge has been cancelled");
        }

        challengeInvitation.setStatus(challengeInviteDTO.getStatus());
        if (challengeInviteDTO.getStatus() == ChallengeInviteStatus.ACCEPTED) {
            saveChallengeParticipant(challengeInvitation.getChallenge());
        }
        return ChallengeInviteDTO.fromChallengeInvitation(challengeInviteRepository.save(challengeInvitation));
    }

    private void saveChallengeParticipant(Challenge challenge) {
        UserDetails userDetails = userService.getLoggedInUser();
        StudentUser studentUser = studentUserRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid user email"));
        ChallengeParticipant challengeParticipant = ChallengeParticipant.builder()
                .challenge(challenge)
                .studentUser(studentUser)
                .build();

        challengeParticipantRepository.save(challengeParticipant);
    }
}
