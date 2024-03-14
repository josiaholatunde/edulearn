package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.User;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    Page<Challenge> findAllByStudentUser_EmailOrCreatedBy(String email, RoleType createdBy, Pageable pageable);
}
