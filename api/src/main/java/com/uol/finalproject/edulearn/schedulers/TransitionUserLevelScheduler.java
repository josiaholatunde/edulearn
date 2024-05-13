package com.uol.finalproject.edulearn.schedulers;

import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.repositories.StudentUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class TransitionUserLevelScheduler {

    private final StudentUserRepository studentUserRepository;

    @Scheduled(fixedDelay = 900000)
    public void scheduleFixedRateWithInitialDelayTask() {
        log.info("About to execute transition user level scheduler");
        studentUserRepository.updateAllUsersLevelByPoints();
        log.info("Finished executing transition user level scheduler");
    }
}
