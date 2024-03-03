package com.uol.mobileweb.gevs_election_polls.entities.enums;

public enum ElectionStatus {
    NOT_STARTED("Not Started"),
    PENDING("Pending"),
    COMPLETED("Completed");

    private String friendlyName;

     ElectionStatus(String friendlyName) {
        this.friendlyName = friendlyName;
     }


    public String getFriendlyName() {
        return friendlyName;
    }
}
