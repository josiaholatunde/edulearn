package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
