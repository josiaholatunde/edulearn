package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.ChallengeInviteDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ChallengeInviteService {

    Page<ChallengeInviteDTO> getInvites(PageRequest pageRequest);

    ChallengeInviteDTO updateChallengeInvite(ChallengeInviteDTO challengeInviteDTO);
}
