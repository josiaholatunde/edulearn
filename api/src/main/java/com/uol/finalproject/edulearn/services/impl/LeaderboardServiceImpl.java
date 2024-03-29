package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.StudentUserDTO;
import com.uol.finalproject.edulearn.apimodel.UserDTO;
import com.uol.finalproject.edulearn.apimodel.specifications.UserSpecificationSearchCriteria;
import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.ChallengeSubmission;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.ChallengeRepository;
import com.uol.finalproject.edulearn.repositories.ChallengeSubmissionRepository;
import com.uol.finalproject.edulearn.repositories.StudentUserRepository;
import com.uol.finalproject.edulearn.services.LeaderboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.uol.finalproject.edulearn.specifications.StudentUserSpecification.buildSearchPredicate;

@Service
@RequiredArgsConstructor
@Slf4j
public class LeaderboardServiceImpl implements LeaderboardService {

    private final StudentUserRepository studentUserRepository;
    private final ChallengeRepository challengeRepository;
    private final ChallengeSubmissionRepository challengeSubmissionRepository;

    public Page<StudentUserDTO> getLeaderboard(UserSpecificationSearchCriteria specificationSearchCriteria) {
        Specification<StudentUser> searchPredicate = buildSearchPredicate(specificationSearchCriteria);
        PageRequest pageRequest = PageRequest.of(specificationSearchCriteria.getPage(), specificationSearchCriteria.getSize());

        List<StudentUserDTO> studentUserDTOs = studentUserRepository.findAll(searchPredicate, pageRequest)
                .stream()
                .map(StudentUserDTO::fromStudentUser)
                .collect(Collectors.toList());

        long totalCount = studentUserRepository.count(searchPredicate);

        return new PageImpl<>(studentUserDTOs, pageRequest, totalCount);
    }

    @Override
    public Page<StudentUserDTO> getLeaderBoardForChallenge(long challengeId) {
        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(() -> new ResourceNotFoundException("Invalid challenge id"));
        PageRequest pageRequest = PageRequest.of(0, 10);
        Page<ChallengeSubmission> challengeSubmissions = challengeSubmissionRepository.findTopChallengeSubmissionByChallengeOrderByScoreDesc(challenge, pageRequest);
        List<StudentUserDTO> studentUserDTOS = challengeSubmissions.stream().map(submission -> {
            StudentUserDTO studentUserDTO = StudentUserDTO.fromStudentUser(submission.getStudentUser());
            studentUserDTO.setPoints(String.valueOf(submission.getScore()));
            return studentUserDTO;
        }).collect(Collectors.toList());
        return new PageImpl<>(studentUserDTOS, pageRequest,  challengeSubmissions.stream().count());
    }
}
