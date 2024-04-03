package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.UserChallengeAnswers;
import com.uol.finalproject.edulearn.entities.UserChallengeQuestionResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserChallengeQuestionResponseRepository extends JpaRepository<UserChallengeQuestionResponse, Long> {
}
