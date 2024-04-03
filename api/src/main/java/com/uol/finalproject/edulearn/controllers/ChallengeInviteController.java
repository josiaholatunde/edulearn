package com.uol.finalproject.edulearn.controllers;


import com.uol.finalproject.edulearn.annotations.WrapResponse;
import com.uol.finalproject.edulearn.apimodel.ChallengeDTO;
import com.uol.finalproject.edulearn.apimodel.ChallengeInviteDTO;
import com.uol.finalproject.edulearn.apimodel.ChallengeSubmissionDTO;
import com.uol.finalproject.edulearn.apimodel.request.ChallengeUserResponse;
import com.uol.finalproject.edulearn.services.ChallengeInviteService;
import com.uol.finalproject.edulearn.services.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/challenge-invites")
@RequiredArgsConstructor
@WrapResponse
public class ChallengeInviteController {

    private final ChallengeInviteService challengeInviteService;

    @GetMapping
    public Page<ChallengeInviteDTO> getAllChallengeInvites(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return challengeInviteService.getInvites(PageRequest.of(page, size));
    }

    @PutMapping
    public ChallengeInviteDTO updateChallengeInvite(@RequestBody ChallengeInviteDTO challengeInviteDTO) {
        return challengeInviteService.updateChallengeInvite(challengeInviteDTO);
    }
}
