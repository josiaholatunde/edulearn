package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.AlgorithmQuestion;
import com.uol.finalproject.edulearn.entities.AlgorithmSolution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlgorithmSolutionRepository extends JpaRepository<AlgorithmSolution, Long> {
}
