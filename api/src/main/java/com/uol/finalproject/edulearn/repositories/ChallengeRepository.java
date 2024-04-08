package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.User;
import com.uol.finalproject.edulearn.entities.enums.ChallengeStatus;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
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
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    Page<Challenge> findAllByStudentUser_EmailOrCreatedBy(String email, RoleType createdBy, Pageable pageable);
    Page<Challenge> findAllByStudentUserAndLevelOrCreatedBy(StudentUser studentUser, long level, RoleType createdBy, Pageable pageable);
    Page<Challenge> findAllByCreatedBy(RoleType createdBy, Pageable pageable);

    @Transactional
    @Modifying
    @Query("UPDATE Challenge c SET c.challengeStatus=?1 WHERE c.id=?2")
    void updateChallengeStatus(ChallengeStatus challengeStatus, Long challengeId);
}
