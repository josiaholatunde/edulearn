package com.uol.finalproject.edulearn.events;

import com.uol.finalproject.edulearn.entities.ChallengeSubmission;
import org.springframework.context.ApplicationEvent;


public class ChallengeCompletedEvent extends ApplicationEvent {

    private ChallengeSubmission challengeSubmission;
    public ChallengeCompletedEvent(Object source, ChallengeSubmission challengeSubmission) {
        super(source);
        this.challengeSubmission = challengeSubmission;
    }

    public ChallengeSubmission getChallengeSubmission() {
        return challengeSubmission;
    }
}
