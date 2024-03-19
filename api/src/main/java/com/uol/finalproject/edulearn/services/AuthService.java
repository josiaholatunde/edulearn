package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.request.RegisterStudentUserDTO;
import com.uol.finalproject.edulearn.apimodel.response.BaseApiResponseDTO;
import com.uol.finalproject.edulearn.exceptions.AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;

public interface AuthService {

    BaseApiResponseDTO loginUser(String userName, String password) throws AuthenticationException;

    BaseApiResponseDTO registerStudentUser(RegisterStudentUserDTO registerVoterDTO);

    BaseApiResponseDTO authenticateUserOauth(String authProvider, String userEmail, OAuth2User oAuth2User);
}
