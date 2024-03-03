package com.uol.mobileweb.gevs_election_polls.services;

import com.uol.mobileweb.gevs_election_polls.entities.Candidate;

import java.util.List;
import java.util.Map;

public interface CandidateService {

    List<Candidate> getCandidatesByConsitituency(int constituencyId);

    Map<String, List<Candidate>> getAllCandidatesGroupedByConstituency();

}
