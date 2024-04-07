package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.AlgorithmSolutionDTO;
import com.uol.finalproject.edulearn.apimodel.MultipleChoiceAnswerDTO;
import com.uol.finalproject.edulearn.apimodel.QuestionDTO;
import com.uol.finalproject.edulearn.entities.*;
import com.uol.finalproject.edulearn.entities.enums.QuestionType;
import com.uol.finalproject.edulearn.repositories.*;
import com.uol.finalproject.edulearn.services.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final MultipleChoiceQuestionRepository multipleChoiceQuestionRepository;
    private final MultipleChoiceOptionRepository multipleChoiceOptionRepository;

    private final AlgorithmQuestionRepository algorithmQuestionRepository;
    private final AlgorithmQuestionExampleRepository algorithmQuestionExampleRepository;

    @Override
    public Page<QuestionDTO> getQuestions(PageRequest pageRequest) {

        Page<Question> questionPage = questionRepository.findAll(pageRequest);
        List<QuestionDTO> questionDTOS = questionPage.stream().map(QuestionDTO::fromQuestion).collect(Collectors.toList());
        return new PageImpl<>(questionDTOS, pageRequest, questionPage.getTotalElements());
    }

    @Override
    public QuestionDTO createQuestion(QuestionDTO questionDTO) {
        Question question = Question.builder().build();
        BeanUtils.copyProperties(questionDTO, question);
        questionRepository.save(question);
        if (questionDTO.getType() == QuestionType.MULTIPLE_CHOICE) {
            MultipleChoiceQuestion multipleChoiceQuestion = MultipleChoiceQuestion.fromMultipleChoiceQuestionDTO(questionDTO.getMultipleChoiceQuestion());
            multipleChoiceQuestion.setQuestion(question);
            multipleChoiceQuestionRepository.save(multipleChoiceQuestion);

            List<MultipleChoiceOption> multipleChoiceOptions =  questionDTO.getMultipleChoiceQuestion().getOptions().stream().map(MultipleChoiceOption::fromMultipleChoiceOptionDTO).collect(Collectors.toList());
            for (MultipleChoiceOption option : multipleChoiceOptions) {
                option.setQuestion(multipleChoiceQuestion);
            }
            multipleChoiceOptionRepository.saveAll(multipleChoiceOptions);

            for (MultipleChoiceAnswerDTO multipleChoiceAnswerDTO: questionDTO.getMultipleChoiceQuestion().getAnswerList()) {
                Optional<MultipleChoiceOption> first = multipleChoiceOptions.stream().filter(option -> option.getTitle().equals(multipleChoiceAnswerDTO.getOptionTitle())).findFirst();

                multipleChoiceQuestion.getAnswers().add(MultipleChoiceAnswer.builder()
                        .question(multipleChoiceQuestion)
                        .option(first.get())
                        .build());
            }
            multipleChoiceQuestionRepository.save(multipleChoiceQuestion);

        } else {
            AlgorithmQuestion algorithmQuestion = AlgorithmQuestion.fromAlgorithmQuestionDTO(questionDTO.getAlgorithmQuestion());
            algorithmQuestion.setQuestion(question);
            algorithmQuestionRepository.save(algorithmQuestion);

            List<AlgorithmQuestionExample> algorithmQuestionExamples = questionDTO.getAlgorithmQuestion().getExamples().stream().map(AlgorithmQuestionExample::fromQuestionExampleDTO).collect(Collectors.toList());
            for (AlgorithmQuestionExample algorithmQuestionExample: algorithmQuestionExamples) {
                algorithmQuestionExample.setAlgorithmQuestion(algorithmQuestion);
            }
            algorithmQuestionExampleRepository.saveAll(algorithmQuestionExamples);

            for (AlgorithmSolutionDTO algorithmSolutionDTO: questionDTO.getAlgorithmQuestion().getSolutions()) {
                AlgorithmSolution algorithmSolution = AlgorithmSolution.builder()
                        .algorithmQuestion(algorithmQuestion)
                        .build();
                BeanUtils.copyProperties(algorithmSolutionDTO, algorithmSolution);
                algorithmQuestion.getSolutions().add(algorithmSolution);
            }
            algorithmQuestionRepository.save(algorithmQuestion);

        }
        return QuestionDTO.fromQuestion(question);
    }
}
