package com.uol.finalproject.edulearn.entities.enums;

public enum ChallengeStatus {
    NOT_STARTED("Not Started"),
    IN_PROGRESS("In Progress"),
    COMPLETED("Completed"),
    CANCELLED("Cancelled");

    private String challengeStatus;
    ChallengeStatus(String challengeStatus) {
        this.challengeStatus = challengeStatus;
    }


    public String getChallengeStatus() {
        return challengeStatus;
    }
}
