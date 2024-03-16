package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.ChallengeDTO;
import com.uol.finalproject.edulearn.apimodel.ChallengeSubmissionDTO;
import com.uol.finalproject.edulearn.apimodel.request.ChallengeUserResponse;
import com.uol.finalproject.edulearn.entities.*;
import com.uol.finalproject.edulearn.entities.enums.ChallengeStatus;
import com.uol.finalproject.edulearn.entities.enums.ChallengeType;
import com.uol.finalproject.edulearn.entities.enums.QuestionType;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.*;
import com.uol.finalproject.edulearn.services.ChallengeService;
import com.uol.finalproject.edulearn.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChallengeServiceImpl implements ChallengeService  {


    private final ChallengeRepository challengeRepository;
    private final StudentUserRepository studentUserRepository;
    private final QuestionRepository questionRepository;
    private final MultipleChoiceOptionRepository multipleChoiceOptionRepository;
    private final ChallengeSubmissionRepository challengeSubmissionRepository;
    private final UserChallengeAnswerRepository challengeAnswerRepository;
    private final UserService userService;

    @Value("${default.multiple.choice.questions:10}")
    private int defaultMultipleChoiceQuestions;

    @Override
    public Page<ChallengeDTO> getChallenges(PageRequest pageRequest) {
        UserDetails userDetails = userService.getLoggedInUser();
        StudentUser studentUser = studentUserRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid user email"));
        Page<Challenge> challenges = challengeRepository
                .findAllByStudentUserAndLevelOrCreatedBy(studentUser, studentUser.getLevel(), RoleType.ADMIN, pageRequest);

        List<ChallengeDTO> challengesDTO = challenges
                .stream()
                .map(ChallengeDTO::fromChallenge)
                .collect(Collectors.toList());

        return new PageImpl<>(challengesDTO, pageRequest, challenges.getTotalElements());
    }

    @Override
    @Transactional
    public ChallengeDTO createChallenge(ChallengeDTO challengeDTO) {
        StudentUser studentUser = retrieveStudentUser();

        Challenge challenge = Challenge.builder().build();
        String challengeTitle = challengeDTO.getTitle();
        if (Strings.isBlank(challengeDTO.getTitle())) {
            challengeTitle = deduceChallengeTitle(challengeDTO, studentUser);
        }
        challenge.setTitle(challengeTitle);
        challenge.setCategory(challengeDTO.getCategory() == null ? "random" : challengeDTO.getCategory());
        challenge.setStudentUser(studentUser);
        challenge.setFriendlyType(challengeDTO.getFriendlyType());
        challenge.setType(challengeDTO.getType());
        challenge.setCreatedBy(studentUser.getUser().getRoleType());
        challenge.setLevel(studentUser.getLevel());
        challenge.setStartDate(Timestamp.from(Instant.now()));
        challenge.setChallengeStatus(ChallengeStatus.NOT_STARTED);
        challenge.setParticipantType(challengeDTO.getParticipantType());
        challenge = challengeRepository.save(challenge);

        assignChallengeQuestions(challenge);

        return ChallengeDTO.fromChallenge(challenge);
    }

    private static String deduceChallengeTitle(ChallengeDTO challengeDTO, StudentUser studentUser) {
        return String.format("%s Random %s Challenge %s", studentUser.getFirstName(), challengeDTO.getParticipantType(), studentUser.getChallenges().size() + 1);
    }

    private void assignChallengeQuestions(Challenge challenge) {
        QuestionType questionType = challenge.getType() == ChallengeType.ALGORITHMS ? QuestionType.ALGORITHMS : QuestionType.MULTIPLE_CHOICE;
        challenge.getChallengeQuestions().addAll(assignQuestionsByQuestionType(questionType));
        challengeRepository.save(challenge);
    }

    private List<Question> assignQuestionsByQuestionType(QuestionType questionType) {
        return questionRepository.findAllByTypeOrderByNoOfUsersLikedDesc(questionType, Limit.of(defaultMultipleChoiceQuestions));
    }

    private StudentUser retrieveStudentUser() {
        UserDetails userDetails = userService.getLoggedInUser();
        return studentUserRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid user email"));
    }


    @Override
    public ChallengeDTO getChallengeDetails(long challengeId) {

        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(() -> new ResourceNotFoundException("Challenge with id was not found"));
        return ChallengeDTO.fromChallenge(challenge);
    }

    @Override
    public ChallengeSubmissionDTO saveChallengeQuestionResponses(ChallengeUserResponse challengeUserResponse) throws Exception {
        Challenge challenge = challengeRepository.findById(challengeUserResponse.getChallengeId())
                .orElseThrow(() -> new ResourceNotFoundException("Challenge with id was not found"));

        ChallengeSubmission challengeSubmission = new ChallengeSubmission();
        challengeSubmission.setStudentUser(retrieveStudentUser());
        challengeSubmission.setChallenge(challenge);
        challengeSubmissionRepository.save(challengeSubmission);

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
        }

        float percentage = (noOfCorrectAnswers / (float) totalQuestions) * 100;
        challengeSubmission.setScore(percentage);
        challengeSubmission.setTotalCorrect(noOfCorrectAnswers);
        challengeSubmission.setTotalQuestions(totalQuestions);
        challengeSubmissionRepository.save(challengeSubmission);

        challenge.setSubmissions(challenge.getSubmissions() + 1);
        challengeRepository.save(challenge);

        return ChallengeSubmissionDTO.fromChallengeSubmission(challengeSubmission);
    }
}
