package com.uol.mobileweb.gevs_election_polls.apimodel.request;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public class RegisterVoterDTO {

    private String voterId;
    private String password;

    private String fullName;

    private LocalDate dateOfBirth;

    @NotBlank(message = "The UVC code is required")
    private String uvc;

    private int constituencyId;

    public RegisterVoterDTO() {
    }

    public RegisterVoterDTO(String username, String password, String fullName, LocalDate dateOfBirth, String UVC, int constituencyId) {
        this.voterId = username;
        this.password = password;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.uvc = UVC;
        this.constituencyId = constituencyId;

    }

    public String getVoterId() {
        return voterId;
    }

    public void setVoterId(String voterId) {
        this.voterId = voterId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getUvc() {
        return uvc;
    }

    public void setUvc(String uvc) {
        this.uvc = uvc;
    }

    public int getConstituencyId() {
        return constituencyId;
    }

    public void setConstituencyId(int constituencyId) {
        this.constituencyId = constituencyId;
    }
}
