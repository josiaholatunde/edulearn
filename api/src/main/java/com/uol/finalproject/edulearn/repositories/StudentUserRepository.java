package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.StudentUser;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentUserRepository extends JpaRepository<StudentUser, Long>, JpaSpecificationExecutor<StudentUser> {

    boolean existsByEmail(String email);
    Optional<StudentUser> findByEmail(String email);

    Page<StudentUser> findAllByUserLoginStatusAndUser_IsActive(boolean isLoggedIn, boolean isActive, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE StudentUser su SET su.userLoginStatus=?1 WHERE su.email=?2")
    void updateUserLoginStatus(boolean isLoggedIn, String userEmail);


    @Modifying
    @Transactional
    @Query(value="UPDATE student_users " +
            "SET level = CASE " +
            "WHEN points >= 0 AND points < 200 THEN 10" +
            "    WHEN points >= 200 AND points < 400 THEN 9" +
            "    WHEN points >= 400 AND points < 600 THEN 8" +
            "    WHEN points >= 600 AND points < 800 THEN 7" +
            "    WHEN points >= 800 AND points < 1000 THEN 6" +
            "    WHEN points >= 1000 AND points < 1200 THEN 5" +
            "    WHEN points >= 1200 AND points < 1400 THEN 4" +
            "    WHEN points >= 1400 AND points < 1600 THEN 3" +
            "    WHEN points >= 1600 AND points < 1800 THEN 2" +
            "    WHEN points >= 1800 THEN 1" +
            "    ELSE level" +
            "   END", nativeQuery = true)
    void updateAllUsersLevelByPoints();


    @Modifying
    @Transactional
    @Query("UPDATE StudentUser su SET su.points= su.points + ?2 WHERE su.id=?1")
    void updateUserPointsById(long studentUserId, long userPoints);
}
