package com.uol.mobileweb.gevs_election_polls.apimodel;

public class ElectoralDistrictDTO {

    private String name;
    private String party;
    private String vote;


    public ElectoralDistrictDTO(String name, String party, long vote) {
        this.name = name;
        this.party = party;
        this.vote = String.valueOf(vote);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getParty() {
        return party;
    }

    public void setParty(String party) {
        this.party = party;
    }

    public String getVote() {
        return vote;
    }

    public void setVote(String vote) {
        this.vote = vote;
    }
}
