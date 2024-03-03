package com.uol.mobileweb.gevs_election_polls.controllers;

import com.uol.mobileweb.gevs_election_polls.apimodel.request.LoginRequestDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.request.RegisterVoterDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.request.UpdateElectionDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.BaseApiResponseDTO;
import com.uol.mobileweb.gevs_election_polls.entities.Election;
import com.uol.mobileweb.gevs_election_polls.services.AuthService;
import com.uol.mobileweb.gevs_election_polls.services.ElectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gevs/election")
public class ElectionController {

    private final ElectionService electionService;

    @Autowired
    public ElectionController(ElectionService electionService) {
        this.electionService = electionService;
    }
    @PostMapping
    public Election updateElectionStatus(@RequestBody UpdateElectionDTO updateElectionDTO) {
        return electionService.updateElectionStatus(updateElectionDTO);
    }

    @GetMapping
    public Election getElectionStatus() {
        return electionService.getElectionDetails();
    }


}
