package com.uol.finalproject.edulearn.entities.enums;

public enum ChallengeType {
    ALGORITHMS("algorithms"),
    MULTIPLE_CHOICE("multiple_choice");

    private String type;

    ChallengeType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
