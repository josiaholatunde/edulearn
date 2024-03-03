package com.uol.mobileweb.gevs_election_polls.apimodel.response;

import com.uol.mobileweb.gevs_election_polls.entities.Candidate;
import com.uol.mobileweb.gevs_election_polls.entities.Election;
import com.uol.mobileweb.gevs_election_polls.entities.Vote;
import com.uol.mobileweb.gevs_election_polls.entities.enums.ElectionStatus;

import java.util.ArrayList;
import java.util.List;

public class VoteDetailsDTO {

    private Election election;

    private Vote vote;

    private List<Candidate> candidates = new ArrayList<>();

    public Vote getVote() {
        return vote;
    }

    public void setVote(Vote vote) {
        this.vote = vote;
    }

    public List<Candidate> getCandidates() {
        return candidates;
    }

    public void setCandidates(List<Candidate> candidates) {
        this.candidates = candidates;
    }

    public Election getElection() {
        return election;
    }

    public void setElection(Election election) {
        this.election = election;
    }



    public VoteDetailsDTO(Election election, Vote vote, List<Candidate> candidates) {
        this.election = election;
        this.vote = vote;
        this.candidates = candidates;
    }
}
