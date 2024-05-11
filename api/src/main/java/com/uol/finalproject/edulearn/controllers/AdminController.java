package com.uol.finalproject.edulearn.controllers;

import com.uol.finalproject.edulearn.apimodel.ChallengeDTO;
import com.uol.finalproject.edulearn.apimodel.QuestionDTO;
import com.uol.finalproject.edulearn.services.ChallengeService;
import com.uol.finalproject.edulearn.services.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final ChallengeService challengeService;
    private final QuestionService questionService;

    @PostMapping("/challenges")
    public ChallengeDTO adminCreateChallenge(@RequestBody ChallengeDTO challengeDTO) {
        return challengeService.createChallengeAndQuestions(challengeDTO);
    }


    @PutMapping("/challenges/{challengeId}")
    public ChallengeDTO adminEditChallenge(@RequestBody ChallengeDTO challengeDTO) {
        return challengeService.editChallengeAndQuestions(challengeDTO);
    }


    @PostMapping("/questions")
    public QuestionDTO adminCreateQuestion(@RequestBody QuestionDTO questionDTO) {
        return questionService.createQuestion(questionDTO);
    }

    @PutMapping("/questions")
    public QuestionDTO adminUpdateQuestion(@RequestBody QuestionDTO questionDTO) {
        return questionService.updateQuestion(questionDTO);
    }


    @DeleteMapping("/questions/{questionId}")
    public void deleteQuestion(@PathVariable long questionId) {
        questionService.deleteQuestion(questionId);
    }
}
