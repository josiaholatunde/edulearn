package com.uol.finalproject.edulearn.controllers;


import com.uol.finalproject.edulearn.annotations.WrapResponse;
import com.uol.finalproject.edulearn.apimodel.UserDTO;
import com.uol.finalproject.edulearn.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/challenges")
@RequiredArgsConstructor
@WrapResponse
@CrossOrigin(origins = "http://localhost:3000")
public class ChallengeController {

    private final UserService userService;

    @GetMapping("/{userId}")
    public UserDTO getAllChallenges(@PathVariable String userId) {
        return userService.getUserDetails(userId);
    }
}
