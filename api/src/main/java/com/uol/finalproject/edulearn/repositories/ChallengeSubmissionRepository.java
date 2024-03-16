package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.ChallengeSubmission;
import com.uol.finalproject.edulearn.entities.User;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChallengeSubmissionRepository extends JpaRepository<ChallengeSubmission, Long> {
}
