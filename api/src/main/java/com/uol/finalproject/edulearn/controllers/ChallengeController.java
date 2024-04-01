package com.uol.finalproject.edulearn.controllers;


import com.uol.finalproject.edulearn.annotations.WrapResponse;
import com.uol.finalproject.edulearn.apimodel.ChallengeDTO;
import com.uol.finalproject.edulearn.apimodel.ChallengeSubmissionDTO;
import com.uol.finalproject.edulearn.apimodel.ChallengeSummaryDTO;
import com.uol.finalproject.edulearn.apimodel.request.ChallengeUserResponse;
import com.uol.finalproject.edulearn.services.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/challenges")
@RequiredArgsConstructor
@WrapResponse
public class ChallengeController {

    private final ChallengeService challengeService;

    @GetMapping
    public Page<ChallengeDTO> getAllChallenges(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

        return challengeService.getChallenges(PageRequest.of(page, size));
    }


    @GetMapping("/{challengeId}")
    public ChallengeDTO getChallengeDetails(@PathVariable long challengeId) {

        return challengeService.getChallengeDetails(challengeId);
    }

    @PostMapping
    public ChallengeDTO createChallenge(@RequestBody ChallengeDTO challengeDTO) {
        return challengeService.createChallenge(challengeDTO);
    }

    @PutMapping("/{challengeId}")
    public ChallengeDTO handleChallengeUpdate(@PathVariable long challengeId, @RequestBody ChallengeDTO challengeDTO) {

        return challengeService.handleChallengeUpdate(challengeId, challengeDTO);
    }

    @PostMapping("/submissions")
    public ChallengeSubmissionDTO saveChallengeQuestionResponses(@RequestBody ChallengeUserResponse challengeUserResponse) throws Exception {
        return challengeService.saveChallengeQuestionResponses(challengeUserResponse);
    }


    @GetMapping("/summary")
    public ChallengeSummaryDTO getChallengesSummary() throws Exception {
        return challengeService.getChallengesSummary();
    }

}