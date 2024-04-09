package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.MultipleChoiceAnswer;
import com.uol.finalproject.edulearn.entities.MultipleChoiceOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MultipleChoiceAnswerRepository extends JpaRepository<MultipleChoiceAnswer, Long> {
}
