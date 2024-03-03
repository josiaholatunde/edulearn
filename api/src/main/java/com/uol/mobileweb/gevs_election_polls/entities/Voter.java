package com.uol.mobileweb.gevs_election_polls.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity(name = "voters")
public class Voter {
    @Id
    @Column(name = "voter_id")
    private String voterId;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "DOB")
    private LocalDate dateOfBirth;

    private String password;

    private String UVC;

    @ManyToOne
    @JoinColumn(name = "constituency_id")
    private Constituency constituency;

    public Voter() {
    }

    public Voter(String voterId, String fullName, LocalDate dateOfBirth, String password, String UVC, Constituency constituency) {
        this.voterId = voterId;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.UVC = UVC;
        this.constituency = constituency;
    }


    public String getVoterId() {
        return voterId;
    }

    public void setVoterId(String voterId) {
        this.voterId = voterId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUVC() {
        return UVC;
    }

    public void setUVC(String UVC) {
        this.UVC = UVC;
    }

    public Constituency getConstituency() {
        return constituency;
    }

    public void setConstituency(Constituency constituency) {
        this.constituency = constituency;
    }
}
