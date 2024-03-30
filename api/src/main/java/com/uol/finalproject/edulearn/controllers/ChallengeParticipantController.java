package com.uol.finalproject.edulearn.controllers;


import com.uol.finalproject.edulearn.annotations.WrapResponse;
import com.uol.finalproject.edulearn.apimodel.ChallengeInviteDTO;
import com.uol.finalproject.edulearn.apimodel.ChallengeParticipantDTO;
import com.uol.finalproject.edulearn.apimodel.StudentUserDTO;
import com.uol.finalproject.edulearn.services.ChallengeInviteService;
import com.uol.finalproject.edulearn.services.ChallengeParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/challenge-participants")
@RequiredArgsConstructor
@WrapResponse
public class ChallengeParticipantController {

    private final ChallengeParticipantService challengeParticipantService;

    @GetMapping("/{challengeId}")
    public Page<ChallengeParticipantDTO> getAllChallengeParticipants(@PathVariable long challengeId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return challengeParticipantService.getChallengeParticipants(challengeId, PageRequest.of(page, size));
    }
}
