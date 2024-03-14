package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.StudentUserDTO;
import com.uol.finalproject.edulearn.apimodel.specifications.UserSpecificationSearchCriteria;
import org.springframework.data.domain.Page;

import java.util.List;

public interface LeaderboardService {


    Page<StudentUserDTO> getLeaderboard(UserSpecificationSearchCriteria specificationSearchCriteria);
}
