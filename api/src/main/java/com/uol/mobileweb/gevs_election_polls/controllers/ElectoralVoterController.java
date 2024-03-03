package com.uol.mobileweb.gevs_election_polls.controllers;

import com.uol.mobileweb.gevs_election_polls.apimodel.request.CastVoteRequestDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.BaseApiResponseDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.VoteDetailsDTO;
import com.uol.mobileweb.gevs_election_polls.services.VoterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gevs/voter")
public class ElectoralVoterController {
    private final VoterService voterService;

    @Autowired
    public ElectoralVoterController(VoterService voterService) {
        this.voterService = voterService;
    }
    @PostMapping
    public BaseApiResponseDTO castVoteForCandidate(@RequestBody CastVoteRequestDTO castVoteRequestDTO) {
        return voterService.castVoteForCandidate(castVoteRequestDTO);
    }


    @GetMapping("/{voterId}")
    public VoteDetailsDTO getVoteDetails(@PathVariable String voterId) {
        return voterService.getVoteDetails(voterId);
    }
}
