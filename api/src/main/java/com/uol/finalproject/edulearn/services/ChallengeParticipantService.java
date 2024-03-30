package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.ChallengeInviteDTO;
import com.uol.finalproject.edulearn.apimodel.ChallengeParticipantDTO;
import com.uol.finalproject.edulearn.apimodel.StudentUserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ChallengeParticipantService {
    Page<ChallengeParticipantDTO> getChallengeParticipants(long challengeId, PageRequest pageRequest);
}
