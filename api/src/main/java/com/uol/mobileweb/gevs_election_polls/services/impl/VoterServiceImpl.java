package com.uol.mobileweb.gevs_election_polls.services.impl;

import com.uol.mobileweb.gevs_election_polls.apimodel.request.CastVoteRequestDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.BaseApiResponseDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.VoteDetailsDTO;
import com.uol.mobileweb.gevs_election_polls.entities.Candidate;
import com.uol.mobileweb.gevs_election_polls.entities.Election;
import com.uol.mobileweb.gevs_election_polls.entities.Vote;
import com.uol.mobileweb.gevs_election_polls.entities.Voter;
import com.uol.mobileweb.gevs_election_polls.exceptions.BadRequestException;
import com.uol.mobileweb.gevs_election_polls.exceptions.ResourceNotFoundException;
import com.uol.mobileweb.gevs_election_polls.repositories.CandidateRepository;
import com.uol.mobileweb.gevs_election_polls.repositories.VoteRepository;
import com.uol.mobileweb.gevs_election_polls.repositories.VoterRepository;
import com.uol.mobileweb.gevs_election_polls.services.ElectionService;
import com.uol.mobileweb.gevs_election_polls.services.VoterService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoterServiceImpl implements VoterService {

    private final VoterRepository voterRepository;
    private final CandidateRepository candidateRepository;
    private final VoteRepository voteRepository;
    private final ElectionService electionService;

    public VoterServiceImpl(VoterRepository voterRepository, CandidateRepository candidateRepository,
                            VoteRepository voteRepository, ElectionService electionService) {

        this.voterRepository = voterRepository;
        this.candidateRepository = candidateRepository;
        this.voteRepository = voteRepository;
        this.electionService = electionService;
    }

    public VoteDetailsDTO getVoteDetails(String voterId) {
        Voter voter = voterRepository.findById(voterId).orElseThrow(() -> new ResourceNotFoundException("Invalid voter id"));

        Election election = electionService.getElectionDetails();
        Optional<Vote> voteOptional = voteRepository.findFirstByVoter(voter);
        List<Candidate> allCandidatesByConstituency = candidateRepository.findAllByConstituency(voter.getConstituency());
        return new VoteDetailsDTO(election, voteOptional.isPresent() ? voteOptional.get() : null, allCandidatesByConstituency);
    }

    @Override
    public BaseApiResponseDTO castVoteForCandidate(CastVoteRequestDTO castVoteRequestDTO) {
        Voter voter = voterRepository.findById(castVoteRequestDTO.getVoterId()).orElseThrow(() -> new ResourceNotFoundException("Invalid voter id"));
        Candidate candidate = candidateRepository.findById(castVoteRequestDTO.getCandidateId()).orElseThrow(() -> new ResourceNotFoundException("Invalid candidate id"));

        if (voteRepository.findFirstByVoter(voter).isPresent()) throw new BadRequestException("You can not cast your vote twice");

        Vote vote = new Vote(candidate, voter);
        voteRepository.save(vote);

        candidate.setVoteCount(candidate.getVoteCount() + 1);
        candidateRepository.save(candidate);
        return new BaseApiResponseDTO("Successfully cast vote");
    }
}
