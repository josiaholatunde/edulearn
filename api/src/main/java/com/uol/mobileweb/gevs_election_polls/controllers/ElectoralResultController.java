package com.uol.mobileweb.gevs_election_polls.controllers;

import com.uol.mobileweb.gevs_election_polls.apimodel.response.ElectoralResultDTO;
import com.uol.mobileweb.gevs_election_polls.services.ElectionService;
import com.uol.mobileweb.gevs_election_polls.services.VoterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gevs/result")
public class ElectoralResultController {
    private final ElectionService electionService;

    @Autowired
    public ElectoralResultController(ElectionService electionService) {
        this.electionService = electionService;
    }
    @GetMapping
    public ElectoralResultDTO getResults() {
        return electionService.getResultDetails();
    }

}
