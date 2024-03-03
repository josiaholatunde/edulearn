package com.uol.mobileweb.gevs_election_polls.controllers;

import com.uol.mobileweb.gevs_election_polls.apimodel.request.LoginRequestDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.request.RegisterVoterDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.BaseApiResponseDTO;
import com.uol.mobileweb.gevs_election_polls.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gevs")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/login")
    public BaseApiResponseDTO loginUser(@RequestBody LoginRequestDTO loginRequestDTO) {
        return authService.loginUser(loginRequestDTO.getUsername(), loginRequestDTO.getPassword());
    }

    @PostMapping("/register/voter")
    public BaseApiResponseDTO registerVoter(@RequestBody RegisterVoterDTO registerVoterDTO) {
        return authService.registerVoter(registerVoterDTO);
    }
}
