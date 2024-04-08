package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.AlgorithmQuestionExample;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlgorithmQuestionExampleRepository extends JpaRepository<AlgorithmQuestionExample, Long> {
}
