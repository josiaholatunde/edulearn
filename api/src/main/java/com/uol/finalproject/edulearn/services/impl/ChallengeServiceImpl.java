package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.ChallengeDTO;
import com.uol.finalproject.edulearn.apimodel.ChallengeSubmissionDTO;
import com.uol.finalproject.edulearn.apimodel.request.ChallengeUserResponse;
import com.uol.finalproject.edulearn.entities.*;
import com.uol.finalproject.edulearn.entities.enums.*;
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
    private final ChallengeSubmissionRepository challengeSubmissionRepository;
    private final ChallengeInviteRepository challengeInviteRepository;
    private final UserService userService;
    private final AlgorithmChallengeServiceImpl algorithmChallengeService;
    private final MultipleChoiceChallengeServiceImpl multipleChoiceChallengeService;

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

        saveChallengeParticipants(challenge, challengeDTO);
        saveChallengeInvites(challenge, challengeDTO);
        assignChallengeQuestions(challenge);

        return ChallengeDTO.fromChallenge(challenge);
    }

    private void saveChallengeParticipants(Challenge challenge, ChallengeDTO challengeDTO) {

        for (Long currentUserId: challengeDTO.getChallengeUsers()) {
            StudentUser studentUser = studentUserRepository.findById(currentUserId).orElseThrow(() -> new ResourceNotFoundException("One or more invalid student user ids"));
            ChallengeParticipant challengeParticipant = ChallengeParticipant.builder()
                    .challenge(challenge)
                    .studentUser(studentUser)
                    .build();
            challenge.getChallengeParticipants().add(challengeParticipant);
        }
        challengeRepository.save(challenge);
    }

    private void saveChallengeInvites(Challenge challenge, ChallengeDTO challengeDTO) {

        for (Long currentUserId: challengeDTO.getChallengeUsers()) {
            StudentUser studentUser = studentUserRepository.findById(currentUserId).orElseThrow(() -> new ResourceNotFoundException("One or more invalid student user ids"));
            ChallengeInvitation challengeInvitation = ChallengeInvitation.builder()
                    .challenge(challenge)
                    .studentUser(studentUser)
                    .status(ChallengeInviteStatus.PENDING)
                    .build();
            challenge.getChallengeInvitations().add(challengeInvitation);
        }
        challengeRepository.save(challenge);
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

        ChallengeSubmissionDTO challengeSubmissionDTO = null;
        if (challenge.getType() == ChallengeType.ALGORITHMS) {
            challengeSubmissionDTO = algorithmChallengeService.saveChallengeQuestionResponses(challengeSubmission, challenge, challengeUserResponse);
        } else {
            challengeSubmissionDTO = multipleChoiceChallengeService.saveChallengeQuestionResponses(challengeSubmission, challenge, challengeUserResponse);
        }
        handlePostChallengeProcess(challenge, challengeSubmission, challengeSubmissionDTO.getTotalCorrect(), challengeSubmissionDTO.getTotalQuestions(), challengeSubmissionDTO.getScore());
        return challengeSubmissionDTO;
    }

    private void handlePostChallengeProcess(Challenge challenge, ChallengeSubmission challengeSubmission, int noOfCorrectAnswers, int totalQuestions, float percentage) {
        challengeSubmission.setScore(percentage);
        challengeSubmission.setTotalCorrect(noOfCorrectAnswers);
        challengeSubmission.setTotalQuestions(totalQuestions);
        challengeSubmissionRepository.save(challengeSubmission);

        expirePendingChallengeInvites(challenge);

        challenge.setSubmissions(challenge.getSubmissions() + 1);
        challengeRepository.save(challenge);
    }

    private void expirePendingChallengeInvites(Challenge challenge) {
        challengeInviteRepository.expirePendingChallengeInvites(challenge);
    }
}
