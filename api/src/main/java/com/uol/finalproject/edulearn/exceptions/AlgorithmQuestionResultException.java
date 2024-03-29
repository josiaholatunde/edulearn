package com.uol.finalproject.edulearn.exceptions;

public class AlgorithmQuestionResultException extends RuntimeException {

    private long testCaseId;
    public AlgorithmQuestionResultException(String message) {
        super(message);
    }

    public AlgorithmQuestionResultException(String message, long testCaseId) {
        super(message);
        this.testCaseId = testCaseId;
    }
}