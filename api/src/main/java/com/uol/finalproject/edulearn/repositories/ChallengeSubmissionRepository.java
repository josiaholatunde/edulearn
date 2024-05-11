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

import java.util.List;
import java.util.Optional;

@Repository
public interface ChallengeSubmissionRepository extends JpaRepository<ChallengeSubmission, Long> {

    Optional<ChallengeSubmission> findFirstByChallengeOrderByScoreDesc(Challenge challenge);

    @Query(value="SELECT id, student_user_id, score " +
            "FROM (" +
            "    SELECT cs.*, ROW_NUMBER() OVER (PARTITION BY cs.student_user_id ORDER BY cs.score DESC) AS submission_rank " +
            "    FROM challenge_submissions cs " +
            "    WHERE cs.challenge_id=?1 " +
            ") rankedSubmissions " +
            "WHERE submission_rank=1 and student_user_id IS NOT NULL " +
            "ORDER BY rankedSubmissions.score DESC", nativeQuery = true)
    Page<Tuple> findTopChallengeSubmissionByChallengeOrderByScoreDesc(long challengeId, Pageable pageable);


    @Query(value = "SELECT COALESCE(COUNT(DISTINCT cs.challenge_id), 0) AS total_challenges, \n" +
            "       COALESCE(COUNT(DISTINCT CASE WHEN cs.is_winner = true THEN cs.challenge_id END), 0) AS challenges_won,\n" +
            "       COALESCE(COUNT(DISTINCT cs.challenge_id) - COUNT(DISTINCT CASE WHEN cs.is_winner = true THEN cs.challenge_id END), 0) AS challenges_lost\n" +
            "FROM challenge_submissions cs " +
            "WHERE cs.student_user_id = ?1", nativeQuery = true)
    Tuple getChallengeSubmissionSummary(Long studentUserId);


    @Query(value="WITH RankedSubmissions AS (\n" +
            "    SELECT a.*,\n" +
            "           ROW_NUMBER() OVER (PARTITION BY challenge_id ORDER BY score DESC) AS submission_rank\n" +
            "    FROM challenge_submissions a\n" +
            "    LEFT JOIN challenges b ON a.challenge_id=b.id\n" +
            "    WHERE student_user_id is not null and b.winner_status_decided IN (false, null) \n" +
            "    and created_by='STUDENT_USER'\n" +
            ")\n" +
            "SELECT id, challenge_id,\n" +
            "       student_user_id,\n" +
            "       score,\n" +
            "       submission_rank,\n" +
            "       CASE \n" +
            "           WHEN score > 0 THEN\n" +
            "               CASE submission_rank\n" +
            "                   WHEN 1 THEN 100\n" +
            "                   WHEN 2 THEN 80\n" +
            "                   WHEN 3 THEN 60\n" +
            "                   ELSE 50\n" +
            "               END\n" +
            "           ELSE 0 \n" +
            "       END AS points\n" +
            "FROM RankedSubmissions;", nativeQuery = true)
    List<Tuple> getRankedSubmissions();

    @Modifying
    @Transactional
    @Query("UPDATE ChallengeSubmission  SET isWinner=true WHERE id=?1")
    void updateChallengeSubmissionWinner(long challengeSubmissionId);
}
