package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.*;
import com.uol.finalproject.edulearn.entities.*;
import com.uol.finalproject.edulearn.entities.enums.QuestionType;
import com.uol.finalproject.edulearn.exceptions.BadRequestException;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.*;
import com.uol.finalproject.edulearn.services.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Iterator;
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
    private final MultipleChoiceAnswerRepository multipleChoiceAnswerRepository;
    private final AlgorithmSolutionRepository algorithmSolutionRepository;
    private final ChallengeRepository challengeRepository;
    private final UserChallengeAnswerRepository userChallengeAnswerRepository;


    @Value("${default.multiple.choice.questions:10}")
    private int defaultMultipleChoiceQuestions;

    @Override
    public Page<QuestionDTO> getQuestions(PageRequest pageRequest, QuestionType type) {
        Page<Question> questionPage = type != null ?
                questionRepository.findAllByTypeOrderByNoOfUsersLikedDesc(type, pageRequest) :
                questionRepository.findAll(pageRequest);

        List<QuestionDTO> questionDTOS = questionPage.getContent()
                .stream()
                .map(QuestionDTO::fromQuestion)
                .collect(Collectors.toList());

        return new PageImpl<>(questionDTOS, pageRequest, questionPage.getTotalElements());
    }

    @Override
    public QuestionDTO createQuestion(QuestionDTO questionDTO) {
        return QuestionDTO.fromQuestion(createQuestionAndReturnEntity(questionDTO));
    }

    @Override
    public Question createQuestionAndReturnEntity(QuestionDTO questionDTO) {
        Question question = saveQuestionDetails(questionDTO);

        if (questionDTO.getType() == QuestionType.MULTIPLE_CHOICE) {
            MultipleChoiceQuestion multipleChoiceQuestion = createMultipleChoiceQuestion(questionDTO, question);
            multipleChoiceQuestionRepository.save(multipleChoiceQuestion);
        } else {
            AlgorithmQuestion algorithmQuestion = createAlgorithmQuestion(questionDTO, question);
            algorithmQuestionRepository.save(algorithmQuestion);
        }
        return question;
    }


    @Override
    public void deleteQuestion(long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new ResourceNotFoundException("Invalid question id"));
        removeQuestionFromChallengeIfExists(question);
        if (question.getType() == QuestionType.MULTIPLE_CHOICE) {
            deleteMultipleChoiceQuestion(question.getMultipleChoiceQuestion());
        } else {
            deleteAlgorithmQuestion(question.getAlgorithmQuestion());
        }
        questionRepository.delete(question);
    }

    private void removeQuestionFromChallengeIfExists(Question question) {
        if (question != null && !question.getChallenges().isEmpty()) {
            for (Challenge challenge: question.getChallenges()) {
                challenge.getChallengeQuestions().remove(question);
                challengeRepository.save(challenge);
            }
        }
    }

    private void deleteAlgorithmQuestion(AlgorithmQuestion algorithmQuestion) {
        if (algorithmQuestion != null) {
            algorithmQuestionExampleRepository.deleteAll(algorithmQuestion.getExamples());
            algorithmSolutionRepository.deleteAll(algorithmQuestion.getSolutions());
            algorithmQuestionRepository.delete(algorithmQuestion);
        }
    }

    private void deleteMultipleChoiceQuestion(MultipleChoiceQuestion multipleChoiceQuestion) {
        if (multipleChoiceQuestion != null) {
            multipleChoiceOptionRepository.deleteAll(multipleChoiceQuestion.getOptions());
            multipleChoiceAnswerRepository.deleteAll(multipleChoiceQuestion.getAnswers());
            multipleChoiceQuestionRepository.delete(multipleChoiceQuestion);
        }
    }

    @Override
    public QuestionDTO updateQuestion(QuestionDTO questionDTO) {
        Question question = saveQuestionDetails(questionDTO);

        if (questionDTO.getType() == QuestionType.MULTIPLE_CHOICE) {
            MultipleChoiceQuestion multipleChoiceQuestion = updateMultipleChoiceQuestion(questionDTO, question);
            multipleChoiceQuestionRepository.save(multipleChoiceQuestion);
        } else {
            AlgorithmQuestion algorithmQuestion = updateAlgorithmQuestion(questionDTO, question);
            algorithmQuestionRepository.save(algorithmQuestion);
        }

        return QuestionDTO.fromQuestion(question);
    }

    private Question saveQuestionDetails(QuestionDTO questionDTO) {
        Question question = null;
        if (questionDTO.getId() == null) {
            question = Question.builder().build();
        } else {
            question = findQuestionById(questionDTO.getId());
        }
        BeanUtils.copyProperties(questionDTO, question);
        question.setDifficultyLevel(questionDTO.getDifficultyLevel());
        return questionRepository.save(question);
    }

    private Question findQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid question id"));
    }

    private MultipleChoiceQuestion createMultipleChoiceQuestion(QuestionDTO questionDTO, Question question) {
        MultipleChoiceQuestion multipleChoiceQuestion = MultipleChoiceQuestion.fromMultipleChoiceQuestionDTO(questionDTO.getMultipleChoiceQuestion());
        multipleChoiceQuestion.setQuestion(question);
        question.setMultipleChoiceQuestion(multipleChoiceQuestion);
        multipleChoiceQuestionRepository.save(multipleChoiceQuestion);

        List<MultipleChoiceOption> multipleChoiceOptions =  questionDTO.getMultipleChoiceQuestion().getOptions().stream().map(MultipleChoiceOption::fromMultipleChoiceOptionDTO).collect(Collectors.toList());
        for (MultipleChoiceOption option : multipleChoiceOptions) {
            option.setQuestion(multipleChoiceQuestion);
        }
        multipleChoiceOptionRepository.saveAll(multipleChoiceOptions);

        for (MultipleChoiceAnswerDTO multipleChoiceAnswerDTO : questionDTO.getMultipleChoiceQuestion().getAnswerList()) {
            Optional<MultipleChoiceOption> first = multipleChoiceOptions.stream().filter(option -> option.getTitle().equals(multipleChoiceAnswerDTO.getOptionTitle())).findFirst();

            multipleChoiceQuestion.getAnswers().add(MultipleChoiceAnswer.builder()
                    .question(multipleChoiceQuestion)
                    .option(first.get())
                    .build());
        }

        return multipleChoiceQuestion;
    }

    private AlgorithmQuestion createAlgorithmQuestion(QuestionDTO questionDTO, Question question) {
        AlgorithmQuestion algorithmQuestion = AlgorithmQuestion.fromAlgorithmQuestionDTO(questionDTO.getAlgorithmQuestion());
        algorithmQuestion.setQuestion(question);
        question.setAlgorithmQuestion(algorithmQuestion);
        algorithmQuestionRepository.save(algorithmQuestion);

        List<AlgorithmQuestionExample> algorithmQuestionExamples = questionDTO.getAlgorithmQuestion().getExamples().stream().map(AlgorithmQuestionExample::fromQuestionExampleDTO).collect(Collectors.toList());
        for (AlgorithmQuestionExample algorithmQuestionExample: algorithmQuestionExamples) {
            algorithmQuestionExample.setAlgorithmQuestion(algorithmQuestion);
        }
        algorithmQuestionExampleRepository.saveAll(algorithmQuestionExamples);

        for (AlgorithmSolutionDTO algorithmSolutionDTO : questionDTO.getAlgorithmQuestion().getSolutions()) {
            AlgorithmSolution algorithmSolution = AlgorithmSolution.builder().build();
            BeanUtils.copyProperties(algorithmSolutionDTO, algorithmSolution);
            algorithmSolution.setAlgorithmQuestion(algorithmQuestion);

            algorithmQuestion.getSolutions().add(algorithmSolution);
        }

        return algorithmQuestion;
    }

    private MultipleChoiceQuestion updateMultipleChoiceQuestion(QuestionDTO questionDTO, Question question) {
        MultipleChoiceQuestion multipleChoiceQuestion = question.getMultipleChoiceQuestion();
        if (multipleChoiceQuestion != null) {
            BeanUtils.copyProperties(questionDTO.getMultipleChoiceQuestion(), multipleChoiceQuestion);
        } else {
            multipleChoiceQuestion = MultipleChoiceQuestion.fromMultipleChoiceQuestionDTO(questionDTO.getMultipleChoiceQuestion());
            multipleChoiceQuestion.setQuestion(question);
        }
        multipleChoiceQuestionRepository.save(multipleChoiceQuestion);

        List<MultipleChoiceOption> multipleChoiceOptions =  questionDTO.getMultipleChoiceQuestion().getOptions().stream().map(MultipleChoiceOption::fromMultipleChoiceOptionDTO).collect(Collectors.toList());
        removeDeletedOptionsFromMultipleChoiceQuestion(multipleChoiceQuestion, multipleChoiceOptions);
        for (MultipleChoiceOption option : multipleChoiceOptions) {
            if (option.getId() != null) {
                for (MultipleChoiceOption existingOption: multipleChoiceQuestion.getOptions()) {
                    if (existingOption.getId() == option.getId()) {
                        existingOption.setTitle(option.getTitle());
                        existingOption.setValue(option.getValue());
                    }
                }
            } else {
                option.setQuestion(multipleChoiceQuestion);
                multipleChoiceQuestion.getOptions().add(option);
            }

        }
        multipleChoiceOptionRepository.saveAll(multipleChoiceQuestion.getOptions());



        removeExistingDeletedAnswers(multipleChoiceQuestion, questionDTO.getMultipleChoiceQuestion().getAnswerList());

        for (MultipleChoiceAnswerDTO multipleChoiceAnswerDTO : questionDTO.getMultipleChoiceQuestion().getAnswerList()) {
            Optional<MultipleChoiceOption> answerOptional = multipleChoiceQuestion.getOptions().stream()
                    .filter(option -> option.getTitle().equals(multipleChoiceAnswerDTO.getOptionTitle()))
                    .findFirst();
            if (answerOptional.isPresent()) {
                if (doesAnswerNotPreviouslyExist(multipleChoiceQuestion, answerOptional)) {
                    multipleChoiceQuestion.getAnswers().add(MultipleChoiceAnswer.builder()
                            .question(multipleChoiceQuestion)
                            .option(answerOptional.get())
                            .build());
                }
            }
        }

        return multipleChoiceQuestion;
    }

    private static boolean doesAnswerNotPreviouslyExist(MultipleChoiceQuestion multipleChoiceQuestion, Optional<MultipleChoiceOption> answerOptional) {
        return !multipleChoiceQuestion.getAnswers().stream().map(answer -> answer.getOption()).collect(Collectors.toList()).contains(answerOptional.get());
    }

    private void removeExistingDeletedAnswers(MultipleChoiceQuestion multipleChoiceQuestion, List<MultipleChoiceAnswerDTO> answerList) {
        for (MultipleChoiceAnswer currentAnswer: multipleChoiceQuestion.getAnswers()) {
            if (!answerList.stream().map(answer -> answer.getOptionId()).collect(Collectors.toList()).contains(currentAnswer.getOption().getId())) {
                multipleChoiceQuestion.getAnswers().remove(currentAnswer);
            }
        }
    }

    private void removeDeletedOptionsFromMultipleChoiceQuestion(MultipleChoiceQuestion multipleChoiceQuestion, List<MultipleChoiceOption> newOptions) {
        if (multipleChoiceQuestion.getOptions() != null && !multipleChoiceQuestion.getOptions().isEmpty()) {
            Iterator<MultipleChoiceOption> iterator = multipleChoiceQuestion.getOptions().iterator();
            while (iterator.hasNext()) {
                MultipleChoiceOption existingOption = iterator.next();
                log.info("Existing Option {}", existingOption);
                if (!newOptions.contains(existingOption)) {
                    if (userChallengeAnswerRepository.existsByOption(existingOption)) throw new BadRequestException("You can not edit a question that users have responded to");

                    iterator.remove();
                    // Remove the option from the answers list if it exists
                    if (multipleChoiceQuestion.getAnswers() != null) {
                        multipleChoiceQuestion.getAnswers().removeIf(answer -> {
                            if (answer.getOption() == null) return true;
                           return answer.getOption().getId() == existingOption.getId();
                        });
                        multipleChoiceAnswerRepository.saveAll(multipleChoiceQuestion.getAnswers());
                    }
                    multipleChoiceOptionRepository.delete(existingOption);
                }
            }
        }
    }

    private AlgorithmQuestion updateAlgorithmQuestion(QuestionDTO questionDTO, Question question) {
        AlgorithmQuestion algorithmQuestion = question.getAlgorithmQuestion();
        BeanUtils.copyProperties(questionDTO.getAlgorithmQuestion(), algorithmQuestion);

        List<AlgorithmQuestionExample> algorithmQuestionExamples = questionDTO.getAlgorithmQuestion().getExamples().stream().map(AlgorithmQuestionExample::fromQuestionExampleDTO).collect(Collectors.toList());
        for (AlgorithmQuestionExample algorithmQuestionExample: algorithmQuestionExamples) {
            algorithmQuestionExample.setAlgorithmQuestion(algorithmQuestion);
        }
        algorithmQuestion.getExamples().clear();
        algorithmQuestion.getExamples().addAll(algorithmQuestionExamples);
        algorithmQuestionExampleRepository.saveAll(algorithmQuestionExamples);

        algorithmQuestion.getSolutions().clear();
        for (AlgorithmSolutionDTO algorithmSolutionDTO : questionDTO.getAlgorithmQuestion().getSolutions()) {
            AlgorithmSolution algorithmSolution = AlgorithmSolution.builder().build();
            BeanUtils.copyProperties(algorithmSolutionDTO, algorithmSolution);
            algorithmSolution.setAlgorithmQuestion(algorithmQuestion);

            algorithmQuestion.getSolutions().add(algorithmSolution);
        }

        return algorithmQuestion;
    }


    public List<Question> assignRandomQuestionsByQuestionType(QuestionType questionType) {
        return questionRepository.findRandomQuestionsByType(questionType.toString(), defaultMultipleChoiceQuestions);
    }
}
