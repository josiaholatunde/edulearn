package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.request.RegisterStudentUserDTO;
import com.uol.finalproject.edulearn.apimodel.response.BaseApiResponseDTO;
import com.uol.finalproject.edulearn.apimodel.response.LoginResponseDTO;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.User;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import com.uol.finalproject.edulearn.repositories.StudentUserRepository;
import com.uol.finalproject.edulearn.repositories.UserRepository;
import com.uol.finalproject.edulearn.services.AuthService;
import com.uol.finalproject.edulearn.services.UserService;
import com.uol.finalproject.edulearn.util.JwtUtils;
import com.uol.mobileweb.gevs_election_polls.exceptions.AuthenticationException;
import com.uol.mobileweb.gevs_election_polls.exceptions.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import static com.uol.finalproject.edulearn.util.Constants.INVALID_LOGIN_CREDENTIALS_MESSAGE;
import static com.uol.finalproject.edulearn.util.Constants.SUCCESS_LOGIN_CREDENTIALS_MESSAGE;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final StudentUserRepository studentUserRepository;
    private final JwtUtils jwtUtils;

    public BaseApiResponseDTO loginUser(String userName, String password) throws AuthenticationException {
        try {
            User user = userService.findByUsername(userName).orElseThrow(() -> new AuthenticationException(INVALID_LOGIN_CREDENTIALS_MESSAGE));
            if (!user.isActive()) throw new AuthenticationException("User is inactive. Kindly contact admin");
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, password));
            SecurityContextHolder.getContext().setAuthentication(authenticate);
            String jwtToken = jwtUtils.generateJwtToken(authenticate);

            LoginResponseDTO loginResponseDTO = new LoginResponseDTO(user, jwtToken, jwtUtils.convertJwtExpiryToMilliSeconds());
            return new BaseApiResponseDTO(SUCCESS_LOGIN_CREDENTIALS_MESSAGE, loginResponseDTO, null);
        } catch (BadCredentialsException ex) {
            log.error("An error occurred while logging in user {}", ex.getMessage());
            throw new AuthenticationException(INVALID_LOGIN_CREDENTIALS_MESSAGE);
        }

    }

    @Override
    public BaseApiResponseDTO registerStudentUser(RegisterStudentUserDTO registerStudentUserDTO) {

        if (!registerStudentUserDTO.doPasswordsMatch()) throw new BadRequestException("Passwords do not match. Kindly try again");
        if (userRepository.existsByUsernameAndRoleType(registerStudentUserDTO.getEmail(), RoleType.STUDENT_USER)) throw new BadRequestException("Email already exists. Kindly try again");
        if (studentUserRepository.existsByStudentNo(registerStudentUserDTO.getStudentNo())) throw new BadRequestException("Student number has been taken. Kindly try again");

        String hashedPassword = passwordEncoder.encode(registerStudentUserDTO.getPassword());
        StudentUser studentUser = studentUserRepository.save(StudentUser.fromRegisterStudent(registerStudentUserDTO));

        User user = new User(registerStudentUserDTO.getEmail(), hashedPassword, true, RoleType.STUDENT_USER, studentUser);
        userRepository.save(user);

        return new BaseApiResponseDTO("Successfully registered student user", studentUser, null);
    }
}
