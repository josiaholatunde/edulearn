package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.ChallengeInvitation;
import com.uol.finalproject.edulearn.entities.StudentUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChallengeInviteRepository extends JpaRepository<ChallengeInvitation, Long> {

    Page<ChallengeInvitation> findAllByStudentUser(StudentUser studentUser, Pageable pageable);
}
