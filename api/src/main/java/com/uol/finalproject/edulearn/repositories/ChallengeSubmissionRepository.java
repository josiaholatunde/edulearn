package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.apimodel.ChallengeSummaryDTO;
import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.ChallengeSubmission;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.User;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChallengeSubmissionRepository extends JpaRepository<ChallengeSubmission, Long> {


    @Query("SELECT cs FROM ChallengeSubmission cs " +
            "JOIN (SELECT cs2.studentUser as studentUser, MAX(cs2.score) as maxScore " +
            "      FROM ChallengeSubmission cs2 " +
            "      WHERE cs2.challenge = ?1 " +
            "      GROUP BY cs2.studentUser) csMax " +
            "ON cs.studentUser = csMax.studentUser AND cs.score = csMax.maxScore " +
            "WHERE cs.challenge = ?1 ORDER BY cs.score DESC")
    Page<ChallengeSubmission> findTopChallengeSubmissionByChallengeOrderByScoreDesc(Challenge challenge, Pageable pageable);


    @Query(value = "SELECT COALESCE(COUNT(DISTINCT cs.challenge_id), 0) AS total_challenges, \n" +
            "       COALESCE(COUNT(DISTINCT CASE WHEN cs.is_winner = true THEN cs.challenge_id END), 0) AS challenges_won,\n" +
            "       COALESCE(COUNT(DISTINCT cs.challenge_id) - COUNT(DISTINCT CASE WHEN cs.is_winner = true THEN cs.challenge_id END), 0) AS challenges_lost\n" +
            "FROM challenge_submissions cs " +
            "WHERE cs.student_user_id = ?1", nativeQuery = true)
    Tuple getChallengeSubmissionSummary(Long studentUserId);
}
