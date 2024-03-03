package com.uol.mobileweb.gevs_election_polls.services;

import com.uol.mobileweb.gevs_election_polls.apimodel.request.CastVoteRequestDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.BaseApiResponseDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.VoteDetailsDTO;

public interface VoterService {

    VoteDetailsDTO getVoteDetails(String voterId);

    BaseApiResponseDTO castVoteForCandidate(CastVoteRequestDTO castVoteRequestDTO);
}
