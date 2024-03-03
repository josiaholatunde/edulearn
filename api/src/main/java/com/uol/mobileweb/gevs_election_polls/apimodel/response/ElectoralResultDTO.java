package com.uol.mobileweb.gevs_election_polls.apimodel.response;

import com.uol.mobileweb.gevs_election_polls.entities.User;

import java.util.ArrayList;
import java.util.List;

public class ElectoralResultDTO {


    private String status;

    private String winner;

    private List<ElectoralPartySeatResultDTO> seats = new ArrayList<>();


    public ElectoralResultDTO() {
    }


    public ElectoralResultDTO(String status, String winner, List<ElectoralPartySeatResultDTO> seats) {
        this.status = status;
        this.winner = winner;
        this.seats = seats;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public List<ElectoralPartySeatResultDTO> getSeats() {
        return seats;
    }

    public void setSeats(List<ElectoralPartySeatResultDTO> seats) {
        this.seats = seats;
    }
}
