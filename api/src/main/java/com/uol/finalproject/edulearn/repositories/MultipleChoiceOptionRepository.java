package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.MultipleChoiceOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MultipleChoiceOptionRepository extends JpaRepository<MultipleChoiceOption, Long> {
}
