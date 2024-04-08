package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.ChallengeInvitation;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.enums.ChallengeInviteStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ChallengeInviteRepository extends JpaRepository<ChallengeInvitation, Long> {

    Page<ChallengeInvitation> findAllByStudentUserOrderByIdDesc(StudentUser studentUser, Pageable pageable);
    Page<ChallengeInvitation> findAllByStudentUserAndStatusInOrderByIdDesc(StudentUser studentUser, List<ChallengeInviteStatus> status, Pageable pageable);

    @Query("UPDATE ChallengeInvitation SET status='EXPIRED' WHERE challenge=?1")
    @Transactional
    @Modifying
    void expirePendingChallengeInvites(Challenge challenge);
}
