package com.uol.mobileweb.gevs_election_polls.controllers;

import com.uol.mobileweb.gevs_election_polls.apimodel.request.LoginRequestDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.request.RegisterVoterDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.BaseApiResponseDTO;
import com.uol.mobileweb.gevs_election_polls.entities.Candidate;
import com.uol.mobileweb.gevs_election_polls.services.AuthService;
import com.uol.mobileweb.gevs_election_polls.services.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/gevs/candidate")
public class ElectoralCandidateController {
    private final CandidateService candidateService;

    @Autowired
    public ElectoralCandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }
    @GetMapping("/{constituencyId}")
    public List<Candidate> getCandidatesByConstituency(@PathVariable int constituencyId) {
        return candidateService.getCandidatesByConsitituency(constituencyId);
    }

    @GetMapping("/all/grouped-by-constituency")
    public Map<String, List<Candidate>> getAllCandidatesGroupedByConstituency() {
        return candidateService.getAllCandidatesGroupedByConstituency();
    }
}
