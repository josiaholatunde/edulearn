package com.uol.finalproject.edulearn.controllers;


import com.uol.finalproject.edulearn.annotations.WrapResponse;
import com.uol.finalproject.edulearn.apimodel.QuestionDTO;
import com.uol.finalproject.edulearn.apimodel.StudentUserDTO;
import com.uol.finalproject.edulearn.apimodel.specifications.UserSpecificationSearchCriteria;
import com.uol.finalproject.edulearn.services.LeaderboardService;
import com.uol.finalproject.edulearn.services.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/questions")
@RequiredArgsConstructor
@WrapResponse
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

    private final QuestionService questionService;


    @GetMapping
    public Page<QuestionDTO> getQuestions(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return questionService.getQuestions(PageRequest.of(page, size));
    }
}
