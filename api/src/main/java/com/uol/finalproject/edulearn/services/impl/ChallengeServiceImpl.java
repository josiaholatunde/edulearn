package com.uol.finalproject.edulearn.services.impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.uol.finalproject.edulearn.apimodel.*;
import com.uol.finalproject.edulearn.apimodel.request.ChallengeUserResponse;
import com.uol.finalproject.edulearn.apimodel.specifications.ChallengeSpecificationSearchCriteria;
import com.uol.finalproject.edulearn.entities.*;
import com.uol.finalproject.edulearn.entities.enums.*;
import com.uol.finalproject.edulearn.exceptions.BadRequestException;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.*;
import com.uol.finalproject.edulearn.services.ChallengeService;
import com.uol.finalproject.edulearn.services.QuestionService;
import com.uol.finalproject.edulearn.services.UserService;
import com.uol.finalproject.edulearn.specifications.ChallengeSpecification;
import com.uol.finalproject.edulearn.util.DateUtil;
import jakarta.persistence.Tuple;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
    private final StompNotificationService stompNotificationService;
    private final QuestionService questionService;

    private final ApplicationEventPublisher applicationEventPublisher;

    @Value("${default.multiple.choice.questions:10}")
    private int defaultMultipleChoiceQuestions;

    @Override
    public Page<ChallengeDTO> getChallenges(ChallengeSpecificationSearchCriteria specificationSearchCriteria) {
        Page<Challenge> challenges = null;
        PageRequest pageRequest = PageRequest.of(specificationSearchCriteria.getPage(), specificationSearchCriteria.getSize());
        RoleType createdBy = specificationSearchCriteria.getCreatedBy();

        if (createdBy != RoleType.ADMIN) {
            UserDetails userDetails = userService.getLoggedInUser();
            StudentUser studentUser = studentUserRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new ResourceNotFoundException("Invalid user email"));
            specificationSearchCriteria.setStudentUser(studentUser);
        }
        challenges = challengeRepository.findAll(ChallengeSpecification.buildSearchPredicate(specificationSearchCriteria), pageRequest);


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

        Challenge challenge = createChallengeFromRequest(challengeDTO, studentUser);

        saveChallengeInvites(challenge, challengeDTO);
        assignChallengeQuestions(challenge);

        return ChallengeDTO.fromChallenge(challenge);
    }

    @Override
    @Transactional
    public ChallengeDTO createChallengeAndQuestions(ChallengeDTO challengeDTO) {
        validateChallenge(challengeDTO);
        Challenge challenge = createChallengeFromRequest(challengeDTO, challengeDTO.getCreatedBy() == RoleType.ADMIN ? null : retrieveStudentUser());

        saveChallengeQuestions(challenge, challengeDTO);

        return ChallengeDTO.fromChallenge(challenge);
    }

    private void validateChallenge(ChallengeDTO challengeDTO) {
        if (Strings.isBlank(challengeDTO.getTitle())) throw new BadRequestException("Challenge title is required");
        if (challengeRepository.existsByTitle(challengeDTO.getTitle())) throw new BadRequestException("Challenge title has been taken");
    }

    @Override
    @Transactional
    public ChallengeDTO editChallengeAndQuestions(ChallengeDTO challengeDTO) {
        Challenge challenge = challengeRepository.findById(challengeDTO.getId()).orElseThrow(() -> new ResourceNotFoundException("Challenge with id was not found"));

        updateChallenge(challengeDTO, challenge);

        saveChallengeQuestions(challenge, challengeDTO);

        return ChallengeDTO.fromChallenge(challenge);
    }

    private void updateChallenge(ChallengeDTO challengeDTO, Challenge challenge) {
        challenge.setTitle(challengeDTO.getTitle());
        challenge.setCategory(challengeDTO.getCategory());
        challenge.setParticipantType(challengeDTO.getParticipantType());
        challenge.setDuration(challengeDTO.getDuration());
        challenge.setLevel(challengeDTO.getLevel());
        challenge.setInstruction(challengeDTO.getInstruction());
        challengeRepository.save(challenge);
    }

    private Challenge saveChallengeQuestions(Challenge challenge, ChallengeDTO challengeDTO) {
        List<Question> challengeQuestions = new ArrayList<>();

        for (QuestionDTO questionDTO : challengeDTO.getChallengeQuestions()) {
            log.info("Current Question {}", questionDTO.getTitle());
            Question question = null;
            if (questionDTO.getId() == null) {
                question = questionService.createQuestionAndReturnEntity(questionDTO);
            } else {
                question = questionRepository.findById(questionDTO.getId()).orElseThrow(() -> new ResourceNotFoundException("Invalid question id"));
                question.setCreatedAt(DateUtil.getCurrentDate());
                question.setUpdatedAt(DateUtil.getCurrentDate());
                questionRepository.save(question);
            }
            challengeQuestions.add(question);
        }
        challenge.setChallengeQuestions(challengeQuestions);
        return challengeRepository.save(challenge);
    }

    private void sendPushNotificationToParticipants(List<String> userEmails, String message) {
        for (String userEmail: userEmails) {
            log.info("About to send challenge invite push notification to user {}", userEmail);
            stompNotificationService.sendNotificationToDestination(String.format("/topic/user/%s/challenge-invite/notification", userEmail), NotificationMessage.builder()
                            .message(message)
                    .build());
            log.info("Successfully sent challenge invite push notification to user {}", userEmail);
        }
    }

    private void sendChallengeStartedPushNotificationToParticipants(List<String> userEmails, Challenge challenge) {
        JsonObject message = new JsonObject();
        message.addProperty("challengeId", challenge.getId());
        message.addProperty("type", challenge.getType().toString());

        for (String userEmail: userEmails) {
            log.info("About to send challenge started push notification to user {}", userEmail);
            stompNotificationService.sendNotificationToDestination(String.format("/topic/user/%s/challenge-started/notification", userEmail), NotificationMessage.builder()
                    .message(new Gson().toJson(message))
                    .build());
            log.info("Successfully sent challenge started push notification to user {}", userEmail);
        }
    }

    @Override
    public ChallengeSummaryV2DTO getChallengesSummary() {
        User loggedInUser = userService.getLoggedInUserDetailsAndReturnEntity();
        if (loggedInUser.getStudentUser() == null) {
            throw new BadRequestException("You need to be logged in to view your challenge summary");
        }
        Tuple challengeSubmissionSummary = challengeSubmissionRepository.getChallengeSubmissionSummary(loggedInUser.getStudentUser().getId());

        return ChallengeSummaryV2DTO.builder()
                .totalChallenges(challengeSubmissionSummary.get(0, Long.class))
                .totalChallengesWon(challengeSubmissionSummary.get(1, Long.class))
                .totalChallengesLost(challengeSubmissionSummary.get(2, Long.class))
                .build();
    }

    @Override
    public ChallengeDTO handleChallengeUpdate(long challengeId, ChallengeDTO challengeDTO) {
        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(() -> new ResourceNotFoundException("Challenge with id was not found"));
        challenge.setChallengeStatus(challengeDTO.getChallengeStatus());
        challengeRepository.updateChallengeStatus(challengeDTO.getChallengeStatus(), challenge.getId());
        if (challengeDTO.getChallengeStatus() == ChallengeStatus.STARTED) {
            List<String> userEmails = challenge.getChallengeParticipants().stream().map(participant -> participant.getStudentUser().getEmail()).collect(Collectors.toList());
            sendChallengeStartedPushNotificationToParticipants(userEmails, challenge);
        }
        return ChallengeDTO.fromChallenge(challenge);
    }

    private Challenge createChallengeFromRequest(ChallengeDTO challengeDTO, StudentUser studentUser) {
        Challenge challenge = Challenge.builder().build();
        String challengeTitle = challengeDTO.getTitle();
        if (Strings.isBlank(challengeDTO.getTitle())) {
            challengeTitle = deduceChallengeTitle(challengeDTO, studentUser);
        }
        challenge.setTitle(challengeTitle);
        challenge.setCategory(challengeDTO.getCategory() == null ? "random" : challengeDTO.getCategory());

        if (challengeDTO.getCreatedBy() != RoleType.ADMIN) {
            challenge.setStudentUser(studentUser);
        }

        challenge.setCreatedBy(challengeDTO.getCreatedBy());

        challenge.setFriendlyType(challengeDTO.getFriendlyType());
        challenge.setType(challengeDTO.getType());
        if (studentUser != null) {
            challenge.setLevel(studentUser.getLevel());
        } else {
            challenge.setLevel(challengeDTO.getLevel());
        }
        challenge.setChallengeStatus(ChallengeStatus.NOT_STARTED);
        challenge.setParticipantType(challengeDTO.getParticipantType());
        challenge.setDuration(challengeDTO.getDuration());

        return challengeRepository.save(challenge);
    }

    private void saveChallengeInvites(Challenge challenge, ChallengeDTO challengeDTO) {

        List<String> invitedUserEmails = new ArrayList<>();
        for (Long currentUserId: challengeDTO.getChallengeUsers()) {
            StudentUser studentUser = studentUserRepository.findById(currentUserId).orElseThrow(() -> new ResourceNotFoundException("One or more invalid student user ids"));
            ChallengeInvitation challengeInvitation = ChallengeInvitation.builder()
                    .challenge(challenge)
                    .studentUser(studentUser)
                    .status(ChallengeInviteStatus.PENDING)
                    .build();
            challenge.getChallengeInvitations().add(challengeInvitation);
            invitedUserEmails.add(studentUser.getEmail());
        }
        challenge.setTotalInvitations(challenge.getTotalInvitations() + challengeDTO.getChallengeUsers().size());
        challengeRepository.save(challenge);
        sendPushNotificationToParticipants(invitedUserEmails, String.format("%s has invited you to a group challenge. Kindly accept or decline", challenge.getStudentUser().getFullName()));
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
        //validate request
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

        challengeRepository.incrementSubmissions(challenge.getId());
        challenge.setSubmissions(challenge.getSubmissions() + 1);
        
        assignUserPointsForIndividualChallenge(challenge, challengeSubmission);
    }

    private void assignUserPointsForIndividualChallenge(Challenge challenge, ChallengeSubmission challengeSubmission) {
        if (challenge.getCreatedBy() == RoleType.ADMIN) {
            Optional<ChallengeSubmission> challengeSubmissionOptional = challengeSubmissionRepository.findFirstByChallengeOrderByScoreDesc(challenge);
            if (challengeSubmissionOptional.isPresent()) {
                ChallengeSubmission topSubmission = challengeSubmissionOptional.get();
                if (challengeSubmission.getScore() >= topSubmission.getScore() || challengeSubmission.getScore() > 0) {
                    studentUserRepository.updateUserPointsById(challengeSubmission.getStudentUser().getId(), challengeSubmission.getScore() >= topSubmission.getScore() ? 100L : 50L);
                }
            } else if (challengeSubmission.getScore() > 0)  {
                studentUserRepository.updateUserPointsById(challengeSubmission.getStudentUser().getId(), 50l);
            }
        }
    }

    private void expirePendingChallengeInvites(Challenge challenge) {
        challengeInviteRepository.expirePendingChallengeInvites(challenge);
    }
}
