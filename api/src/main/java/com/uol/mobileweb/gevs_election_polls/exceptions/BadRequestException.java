package com.uol.mobileweb.gevs_election_polls.exceptions;

public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }
}