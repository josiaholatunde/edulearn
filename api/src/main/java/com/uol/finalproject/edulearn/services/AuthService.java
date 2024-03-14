package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.request.RegisterStudentUserDTO;
import com.uol.finalproject.edulearn.apimodel.response.BaseApiResponseDTO;
import com.uol.finalproject.edulearn.exceptions.AuthenticationException;

public interface AuthService {

    BaseApiResponseDTO loginUser(String userName, String password) throws AuthenticationException;

    BaseApiResponseDTO registerStudentUser(RegisterStudentUserDTO registerVoterDTO);
}
