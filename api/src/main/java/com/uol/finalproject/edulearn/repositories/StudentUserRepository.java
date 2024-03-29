package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.StudentUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentUserRepository extends JpaRepository<StudentUser, Long>, JpaSpecificationExecutor<StudentUser> {

    boolean existsByEmail(String email);
    Optional<StudentUser> findByEmail(String email);

    Page<StudentUser> findAllByUserLoginStatusAndUser_IsActive(boolean isLoggedIn, boolean isActive, Pageable pageable);
}
