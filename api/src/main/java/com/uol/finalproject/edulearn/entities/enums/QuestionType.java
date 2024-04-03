package com.uol.finalproject.edulearn.entities.enums;

public enum QuestionType {
    ALGORITHMS("algorithms"),
    MULTIPLE_CHOICE("multiple_choice");

    private String type;

    QuestionType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
