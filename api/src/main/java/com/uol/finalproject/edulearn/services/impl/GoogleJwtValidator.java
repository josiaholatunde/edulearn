package com.uol.finalproject.edulearn.services.impl;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.User;
import com.uol.finalproject.edulearn.entities.enums.AuthProvider;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import com.uol.finalproject.edulearn.repositories.StudentUserRepository;
import com.uol.finalproject.edulearn.repositories.UserRepository;
import com.uol.finalproject.edulearn.services.JwtValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;

@Service
@RequiredArgsConstructor
@Slf4j
public class GoogleJwtValidator implements JwtValidator {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;


    private final GoogleIdTokenVerifier googleIdTokenVerifier;
    private final StudentUserRepository studentUserRepository;
    private final UserRepository userRepository;

    public AuthProvider getAuthProvider() {
        return AuthProvider.GOOGLE;
    }

    @Override
    public boolean validateJwt(String authorizationToken) {
        try {
            GoogleIdToken idToken = GoogleIdToken.parse(googleIdTokenVerifier.getJsonFactory(), authorizationToken);
            return googleIdTokenVerifier.verify(idToken);
        } catch (IOException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e);
        } catch (GeneralSecurityException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public String getUsernameFromJwt(String jwtToken) {

        try {
            GoogleIdToken idToken = GoogleIdToken.parse(googleIdTokenVerifier.getJsonFactory(), jwtToken);
            GoogleIdToken.Payload payload = idToken.getPayload();
            if (!userRepository.existsByUsername(payload.getEmail())) {
                registerUserIfNotPresent(payload.getEmail(), payload.get("given_name").toString(),  payload.get("family_name").toString());
            }
            if (studentUserRepository.existsByEmail(payload.getEmail())) {
                studentUserRepository.updateUserLoginStatus(true, payload.getEmail());
            }
            return payload.getEmail();
        } catch (IOException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e);
        }

    }

    private void registerUserIfNotPresent(String email, String firstName, String lastName) {
        StudentUser studentUser = studentUserRepository.save(StudentUser.builder()
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .build());

        userRepository.save(User.builder()
                .username(email)
                .isActive(true)
                .roleType(RoleType.STUDENT_USER)
                .studentUser(studentUser)
                .authProvider(AuthProvider.GOOGLE.toString())
                .build());
    }
}
