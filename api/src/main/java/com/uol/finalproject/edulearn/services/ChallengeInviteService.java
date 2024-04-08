package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.ChallengeInviteDTO;
import com.uol.finalproject.edulearn.entities.enums.ChallengeInviteStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ChallengeInviteService {

    Page<ChallengeInviteDTO> getInvites(PageRequest pageRequest, ChallengeInviteStatus inviteStatus);

    ChallengeInviteDTO updateChallengeInvite(ChallengeInviteDTO challengeInviteDTO);
}
