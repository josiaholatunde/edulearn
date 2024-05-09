package com.uol.finalproject.edulearn.schedulers;

import com.uol.finalproject.edulearn.repositories.ChallengeRepository;
import com.uol.finalproject.edulearn.repositories.ChallengeSubmissionRepository;
import com.uol.finalproject.edulearn.repositories.StudentUserRepository;
import jakarta.persistence.Tuple;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class UpdateUserChallengePointsScheduler {

    private final ChallengeSubmissionRepository challengeSubmissionRepository;
    private final ChallengeRepository challengeRepository;
    private final StudentUserRepository studentUserRepository;

    @Scheduled(fixedDelay = 50000)
    public void scheduleFixedRateWithInitialDelayTask() {
        log.info("About to execute transition user challenge points scheduler");

        List<Tuple> rankedSubmissionsByChallenge = challengeSubmissionRepository.getRankedSubmissions();
        for (Tuple rankedSubmission: rankedSubmissionsByChallenge) {
            long userRank = rankedSubmission.get(4, Long.class);
            long userId = rankedSubmission.get(2, Long.class);
            long challengeSubmissionId = rankedSubmission.get(0, Long.class);
            long challengeId = rankedSubmission.get(1, Long.class);
            long points = rankedSubmission.get(5, Long.class);

            if (userRank == 1) {
                challengeSubmissionRepository.updateChallengeSubmissionWinner(challengeSubmissionId);
                challengeRepository.updateWinnerDecisionStatus(challengeId, true);
            }
            studentUserRepository.updateUserPointsById(userId, points);
        }
        log.info("Finished executing transition user challenge points scheduler");
    }
}
