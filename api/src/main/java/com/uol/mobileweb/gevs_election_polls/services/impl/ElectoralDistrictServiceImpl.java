package com.uol.mobileweb.gevs_election_polls.services.impl;

import com.uol.mobileweb.gevs_election_polls.apimodel.ElectoralDistrictDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.ElectoralDistrictResponseDTO;
import com.uol.mobileweb.gevs_election_polls.entities.Constituency;
import com.uol.mobileweb.gevs_election_polls.exceptions.ResourceNotFoundException;
import com.uol.mobileweb.gevs_election_polls.repositories.CandidateRepository;
import com.uol.mobileweb.gevs_election_polls.repositories.ConstituencyRepository;
import com.uol.mobileweb.gevs_election_polls.services.ElectoralDistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ElectoralDistrictServiceImpl implements ElectoralDistrictService {

    private final CandidateRepository candidateRepository;
    private final ConstituencyRepository constituencyRepository;

    @Autowired
    public ElectoralDistrictServiceImpl(CandidateRepository candidateRepository,
                                        ConstituencyRepository constituencyRepository) {
        this.candidateRepository = candidateRepository;
        this.constituencyRepository = constituencyRepository;
    }

    @Override
    public ElectoralDistrictResponseDTO getElectoralDistrictVoteCount(String constituencyName) {
        Constituency constituency = this.constituencyRepository.findByConstituencyName(constituencyName).orElseThrow(() -> new ResourceNotFoundException("Consitituency with name does not exist"));
        List<ElectoralDistrictDTO> constituencyResult = this.candidateRepository.getConstituencyResult(constituency);
        return new ElectoralDistrictResponseDTO(constituencyName, constituencyResult);
    }

    @Override
    public List<Constituency> getConstituencies() {
        return this.constituencyRepository.findAll();
    }
}
