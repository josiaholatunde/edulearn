package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.ChallengeSubmissionDTO;
import com.uol.finalproject.edulearn.apimodel.request.ChallengeUserResponse;
import com.uol.finalproject.edulearn.entities.*;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.MultipleChoiceOptionRepository;
import com.uol.finalproject.edulearn.repositories.QuestionRepository;
import com.uol.finalproject.edulearn.repositories.UserChallengeAnswerRepository;
import com.uol.finalproject.edulearn.repositories.UserChallengeQuestionResponseRepository;
import com.uol.finalproject.edulearn.services.ChallengeEvaluatorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MultipleChoiceChallengeServiceImpl implements ChallengeEvaluatorService {

    private final QuestionRepository questionRepository;
    private final MultipleChoiceOptionRepository multipleChoiceOptionRepository;
    private final UserChallengeAnswerRepository challengeAnswerRepository;
    private final UserChallengeQuestionResponseRepository challengeQuestionResponseRepository;


    @Override
    public ChallengeSubmissionDTO saveChallengeQuestionResponses(ChallengeSubmission challengeSubmission, Challenge challenge, ChallengeUserResponse challengeUserResponse) throws Exception {
        int noOfCorrectAnswers = 0;
        int totalQuestions = challenge.getChallengeQuestions().size();

        for (Map.Entry<Long, List<Long>> entry : challengeUserResponse.getUserResponse().entrySet()) {
            long questionId = entry.getKey();
            Question question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new ResourceNotFoundException("One or more invalid question ids"));

            List<MultipleChoiceOption> answerOptions = question.getMultipleChoiceQuestion().getAnswers().stream()
                    .map(MultipleChoiceAnswer::getOption)
                    .collect(Collectors.toList());
            if (answerOptions.isEmpty()) throw new Exception("Answer not configured for question. Kindly contact admin");

            int noOfValidAnswers = (int) entry.getValue().stream()
                    .filter(optionId -> multipleChoiceOptionRepository.existsById(optionId))
                    .filter(optionId -> answerOptions.stream().anyMatch(option -> option.getId().equals(optionId)))
                    .count();

            if (noOfValidAnswers == answerOptions.size()) noOfCorrectAnswers += 1;

            entry.getValue().forEach(optionId -> {
                MultipleChoiceOption option = multipleChoiceOptionRepository.findById(optionId)
                        .orElseThrow(() -> new ResourceNotFoundException("One or more invalid option ids"));

                UserChallengeAnswers challengeAnswer = new UserChallengeAnswers();
                challengeAnswer.setOption(option);
                challengeAnswer.setQuestion(question);
                challengeAnswer.setChallengeSubmission(challengeSubmission);
                challengeAnswerRepository.save(challengeAnswer);
            });
            saveChallengeQuestionResponse(challengeSubmission, question, answerOptions, noOfValidAnswers);
        }

        float percentage = (noOfCorrectAnswers / (float) totalQuestions) * 100;
        challengeSubmission.setScore(percentage);
        challengeSubmission.setTotalCorrect(noOfCorrectAnswers);
        challengeSubmission.setTotalQuestions(totalQuestions);

        return ChallengeSubmissionDTO.fromChallengeSubmission(challengeSubmission);
    }

    private void saveChallengeQuestionResponse(ChallengeSubmission challengeSubmission, Question question, List<MultipleChoiceOption> answerOptions, int noOfValidAnswers) {
        UserChallengeQuestionResponse questionResponse = challengeQuestionResponseRepository.save(UserChallengeQuestionResponse.builder()
                .isCorrect(noOfValidAnswers == answerOptions.size())
                .question(question)
                .challengeSubmission(challengeSubmission)
                .build());
        challengeSubmission.getQuestionResponses().add(questionResponse);
    }
}
