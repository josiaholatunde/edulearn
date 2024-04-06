package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.QuestionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface QuestionService {
    Page<QuestionDTO> getQuestions(PageRequest pageRequest);

    QuestionDTO createQuestion(QuestionDTO questionDTO);
}
