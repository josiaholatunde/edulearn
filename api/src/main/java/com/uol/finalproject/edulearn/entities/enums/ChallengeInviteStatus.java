package com.uol.finalproject.edulearn.entities.enums;

public enum ChallengeInviteStatus {
    PENDING("Pending"),
    EXPIRED("Expired"),
    ACCEPTED("Accepted"),
    DECLINED("Declined"),
    CANCELLED("Cancelled");

    private String challengeStatus;
    ChallengeInviteStatus(String challengeStatus) {
        this.challengeStatus = challengeStatus;
    }


    public String getChallengeStatus() {
        return challengeStatus;
    }
}
