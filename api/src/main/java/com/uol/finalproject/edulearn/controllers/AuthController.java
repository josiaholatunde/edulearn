package com.uol.finalproject.edulearn.controllers;

import com.uol.finalproject.edulearn.apimodel.request.LoginRequestDTO;
import com.uol.finalproject.edulearn.apimodel.request.RegisterStudentUserDTO;
import com.uol.finalproject.edulearn.apimodel.response.BaseApiResponseDTO;
import com.uol.finalproject.edulearn.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
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

    @PostMapping("/register")
    public BaseApiResponseDTO registerUser(@RequestBody RegisterStudentUserDTO registerStudentUserDTO) {
        return authService.registerStudentUser(registerStudentUserDTO);
    }
}
