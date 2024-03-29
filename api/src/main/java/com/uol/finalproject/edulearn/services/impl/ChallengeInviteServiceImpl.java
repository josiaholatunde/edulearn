package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.ChallengeInviteDTO;
import com.uol.finalproject.edulearn.entities.ChallengeInvitation;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.ChallengeInviteRepository;
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

    @Override
    public Page<ChallengeInviteDTO> getInvites(PageRequest pageRequest) {
        UserDetails userDetails = userService.getLoggedInUser();
        StudentUser studentUser = studentUserRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid user email"));
        Page<ChallengeInvitation> challengeInvitations = challengeInviteRepository
                .findAllByStudentUser(studentUser, pageRequest);

        List<ChallengeInviteDTO> challengesDTO = challengeInvitations
                .stream()
                .map(ChallengeInviteDTO::fromChallengeInvitation)
                .collect(Collectors.toList());

        return new PageImpl<>(challengesDTO, pageRequest, challengeInvitations.getTotalElements());
    }

    @Override
    public ChallengeInviteDTO updateChallengeInvite(ChallengeInviteDTO challengeInviteDTO) {
        ChallengeInvitation challengeInvitation = challengeInviteRepository.findById(challengeInviteDTO.getId()).orElseThrow(() -> new ResourceNotFoundException("Invalid challenge invite id"));
        challengeInvitation.setStatus(challengeInviteDTO.getStatus());
        return ChallengeInviteDTO.fromChallengeInvitation(challengeInviteRepository.save(challengeInvitation));
    }
}
