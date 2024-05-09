package com.uol.finalproject.edulearn.listeners;

import com.uol.finalproject.edulearn.entities.ChallengeSubmission;
import com.uol.finalproject.edulearn.events.ChallengeCompletedEvent;
import org.springframework.context.ApplicationListener;

public class ChallengeCompletedListener implements ApplicationListener<ChallengeCompletedEvent> {

    @Override
    public void onApplicationEvent(ChallengeCompletedEvent event) {
        ChallengeSubmission challengeSubmission = event.getChallengeSubmission();
        if (challengeSubmission != null) {

        }
    }
}
