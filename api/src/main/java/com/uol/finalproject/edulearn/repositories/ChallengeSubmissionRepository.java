package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.ChallengeSubmission;
import com.uol.finalproject.edulearn.entities.User;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
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
}
