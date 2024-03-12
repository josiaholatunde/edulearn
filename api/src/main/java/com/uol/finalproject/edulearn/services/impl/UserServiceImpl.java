package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.StudentUserDTO;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.User;
import com.uol.finalproject.edulearn.exceptions.AuthorizationException;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.StudentUserRepository;
import com.uol.finalproject.edulearn.repositories.UserRepository;
import com.uol.finalproject.edulearn.services.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final StudentUserRepository studentUserRepository;

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }


    @Override
    public StudentUserDTO editUser(StudentUserDTO studentUserDTO, String userId) {
        if (!isLoggedInUserAuthorized(studentUserDTO)) throw new AuthorizationException("User is not authorized to carry out action");
        StudentUser studentUser = studentUserRepository.findByEmail(studentUserDTO.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User with email was not found"));
        User user = userRepository.findByUsername(studentUserDTO.getEmail()).orElseThrow(() -> new ResourceNotFoundException("User with email was not found"));
        if (!user.isActive()) throw new AuthorizationException("User is not authorized to carry out action");

        if (Strings.isNotBlank(studentUserDTO.getBiography())) studentUser.setBiography(studentUserDTO.getBiography());
        if (Strings.isNotBlank(studentUserDTO.getSkills())) studentUser.setSkills(studentUserDTO.getSkills());
        if (Strings.isNotBlank(studentUserDTO.getUniversity())) studentUser.setUniversity(studentUserDTO.getUniversity());
        if (Strings.isNotBlank(studentUserDTO.getFirstName())) studentUser.setFirstName(studentUserDTO.getFirstName());
        if (Strings.isNotBlank(studentUserDTO.getLastName())) studentUser.setLastName(studentUserDTO.getLastName());

        return StudentUserDTO.fromStudentUser(studentUserRepository.save(studentUser));
    }

    private boolean isLoggedInUserAuthorized(StudentUserDTO studentUserDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            String loggedInUserEmail = ((UserDetails) authentication.getPrincipal()).getUsername();
            return loggedInUserEmail.equals(studentUserDTO.getEmail());
        }
        return false;
    }

}
