package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.QuestionDTO;
import com.uol.finalproject.edulearn.entities.enums.QuestionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface QuestionService {
    Page<QuestionDTO> getQuestions(PageRequest pageRequest, QuestionType type);

    QuestionDTO createQuestion(QuestionDTO questionDTO);

    QuestionDTO updateQuestion(QuestionDTO questionDTO);

    void deleteQuestion(long questionId);
}
