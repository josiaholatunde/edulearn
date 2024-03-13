package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.StudentUserDTO;
import com.uol.finalproject.edulearn.apimodel.UserDTO;
import com.uol.finalproject.edulearn.apimodel.specifications.UserSpecificationSearchCriteria;
import com.uol.finalproject.edulearn.entities.StudentUser;
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
}
