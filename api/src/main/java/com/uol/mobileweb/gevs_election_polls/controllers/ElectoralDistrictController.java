package com.uol.mobileweb.gevs_election_polls.controllers;

import com.uol.mobileweb.gevs_election_polls.apimodel.response.ElectoralDistrictResponseDTO;
import com.uol.mobileweb.gevs_election_polls.entities.Constituency;
import com.uol.mobileweb.gevs_election_polls.services.ElectoralDistrictService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/gevs/constituency")
public class ElectoralDistrictController {


    private final ElectoralDistrictService electoralDistrictService;

    public ElectoralDistrictController(ElectoralDistrictService electoralDistrictService) {

        this.electoralDistrictService = electoralDistrictService;
    }

    @GetMapping
    public List<Constituency> getConstituencies() {
        return this.electoralDistrictService.getConstituencies();
    }

    @GetMapping("/{constituencyName}")
    public ElectoralDistrictResponseDTO getElectoralDistrictVoteCount(@PathVariable String constituencyName) {
        return this.electoralDistrictService.getElectoralDistrictVoteCount(constituencyName);
    }
}
