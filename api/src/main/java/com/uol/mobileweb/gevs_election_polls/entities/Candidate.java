package com.uol.mobileweb.gevs_election_polls.entities;

import jakarta.persistence.*;

@Entity
public class Candidate {

    @Id
    @GeneratedValue
    @Column(name = "canid")
    private int candidateId;

    private String candidate;

    @Column(name = "vote_count")
    private long voteCount;

    @ManyToOne
    @JoinColumn(name = "consitituency_id")
    private Constituency constituency;

    @ManyToOne
    @JoinColumn(name = "party_id")
    private Party party;


    public Candidate() {
    }


    public int getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(int candidateId) {
        this.candidateId = candidateId;
    }

    public String getCandidate() {
        return candidate;
    }

    public void setCandidate(String candidate) {
        this.candidate = candidate;
    }

    public long getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(long voteCount) {
        this.voteCount = voteCount;
    }

    public Constituency getConstituency() {
        return constituency;
    }

    public void setConstituency(Constituency constituency) {
        this.constituency = constituency;
    }

    public Party getParty() {
        return party;
    }

    public void setParty(Party party) {
        this.party = party;
    }
}
