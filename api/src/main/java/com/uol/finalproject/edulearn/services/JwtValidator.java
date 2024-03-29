package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.entities.enums.AuthProvider;

public interface JwtValidator {

    AuthProvider getAuthProvider();

    boolean validateJwt(String authorizationToken);

    String getUsernameFromJwt(String jwtToken);
}
