package com.uol.mobileweb.gevs_election_polls.services.impl;

import com.uol.mobileweb.gevs_election_polls.entities.Candidate;
import com.uol.mobileweb.gevs_election_polls.entities.Constituency;
import com.uol.mobileweb.gevs_election_polls.exceptions.ResourceNotFoundException;
import com.uol.mobileweb.gevs_election_polls.repositories.CandidateRepository;
import com.uol.mobileweb.gevs_election_polls.repositories.ConstituencyRepository;
import com.uol.mobileweb.gevs_election_polls.services.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CandidateServiceImpl implements CandidateService {

    private final CandidateRepository candidateRepository;
    private ConstituencyRepository constituencyRepository;

    @Autowired
    public CandidateServiceImpl(CandidateRepository candidateRepository, ConstituencyRepository constituencyRepository) {
        this.candidateRepository = candidateRepository;
        this.constituencyRepository = constituencyRepository;
    }

    @Override
    public List<Candidate> getCandidatesByConsitituency(int constituencyId) {
        Constituency constituency = constituencyRepository.findById(constituencyId).orElseThrow(() -> new ResourceNotFoundException("Invalid constituency id"));
        return candidateRepository.findAllByConstituency(constituency);
    }

    @Override
    public Map<String, List<Candidate>> getAllCandidatesGroupedByConstituency() {
        Map<String, List<Candidate>> allConstituencyCandidates = new HashMap<>();

        for (Constituency constituency: constituencyRepository.findAll()) {
            String constituencyName = constituency.getConstituencyName();
            allConstituencyCandidates.put(constituencyName, candidateRepository.findAllByConstituency(constituency));
        }
        return allConstituencyCandidates;
    }
}
