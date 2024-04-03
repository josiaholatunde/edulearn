package com.uol.finalproject.edulearn.controllers;


import com.uol.finalproject.edulearn.annotations.WrapResponse;
import com.uol.finalproject.edulearn.apimodel.StudentUserDTO;
import com.uol.finalproject.edulearn.apimodel.UserDTO;
import com.uol.finalproject.edulearn.apimodel.specifications.UserSpecificationSearchCriteria;
import com.uol.finalproject.edulearn.services.LeaderboardService;
import com.uol.finalproject.edulearn.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/leaderboard")
@RequiredArgsConstructor
@WrapResponse
@CrossOrigin(origins = "http://localhost:3000")
public class LeaderBoardController {

    private final LeaderboardService leaderboardService;


    @GetMapping
    public Page<StudentUserDTO> getLeaderBoard(UserSpecificationSearchCriteria specificationSearchCriteria) {
        return leaderboardService.getLeaderboard(specificationSearchCriteria);
    }


    @GetMapping("/challenge/{challengeId}")
    public Page<StudentUserDTO> getLeaderBoardForChallenge(@PathVariable int challengeId) {
        return leaderboardService.getLeaderBoardForChallenge(challengeId);
    }
}
