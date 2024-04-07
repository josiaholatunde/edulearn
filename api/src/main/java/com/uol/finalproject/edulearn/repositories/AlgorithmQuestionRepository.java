package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.AlgorithmQuestion;
import com.uol.finalproject.edulearn.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlgorithmQuestionRepository extends JpaRepository<AlgorithmQuestion, Long> {
}
