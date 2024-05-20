package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.Question;
import com.uol.finalproject.edulearn.entities.enums.QuestionType;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findAllByTypeOrderByNoOfUsersLikedDesc(QuestionType questionType, Limit limit);
    Page<Question> findAllByTypeOrderByNoOfUsersLikedDesc(QuestionType questionType, Pageable pageable);


    @Query(value = "SELECT * FROM questions WHERE type=:type ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Question> findRandomQuestionsByType(@Param("type") String type, @Param("limit") int limit);
}
