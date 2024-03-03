package com.uol.mobileweb.gevs_election_polls.apimodel.response;

public class ElectoralPartySeatResultDTO {


    private String party;

    private String seat;

    public ElectoralPartySeatResultDTO() {
    }


    public ElectoralPartySeatResultDTO(String party, String seat) {
        this.party = party;
        this.seat = seat;
    }

    public String getParty() {
        return party;
    }

    public void setParty(String party) {
        this.party = party;
    }

    public String getSeat() {
        return seat;
    }

    public void setSeat(String seat) {
        this.seat = seat;
    }
}
