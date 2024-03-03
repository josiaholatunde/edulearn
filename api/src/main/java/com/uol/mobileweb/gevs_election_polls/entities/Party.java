package com.uol.mobileweb.gevs_election_polls.entities;

import jakarta.persistence.*;

@Entity
public class Party {

    @Id
    @GeneratedValue
    @Column(name = "party_id")
    private long partyId;

    private String party;


    public Party() {
    }

    public long getPartyId() {
        return partyId;
    }

    public void setPartyId(long partyId) {
        this.partyId = partyId;
    }

    public String getParty() {
        return party;
    }

    public void setParty(String party) {
        this.party = party;
    }
}
