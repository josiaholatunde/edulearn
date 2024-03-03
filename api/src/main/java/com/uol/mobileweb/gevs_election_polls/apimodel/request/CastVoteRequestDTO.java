package com.uol.mobileweb.gevs_election_polls.apimodel.request;

public class CastVoteRequestDTO {

    private String voterId;
    private int candidateId;


    public String getVoterId() {
        return voterId;
    }

    public void setVoterId(String voterId) {
        this.voterId = voterId;
    }

    public int getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(int candidateId) {
        this.candidateId = candidateId;
    }
}
