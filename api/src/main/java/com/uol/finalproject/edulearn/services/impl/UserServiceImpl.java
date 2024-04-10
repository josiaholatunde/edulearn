package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.StudentUserDTO;
import com.uol.finalproject.edulearn.apimodel.UserDTO;
import com.uol.finalproject.edulearn.apimodel.response.BaseApiResponseDTO;
import com.uol.finalproject.edulearn.apimodel.response.LoginResponseDTO;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.User;
import com.uol.finalproject.edulearn.entities.UserSocialProfile;
import com.uol.finalproject.edulearn.exceptions.AuthenticationException;
import com.uol.finalproject.edulearn.exceptions.AuthorizationException;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.StudentUserRepository;
import com.uol.finalproject.edulearn.repositories.UserRepository;
import com.uol.finalproject.edulearn.services.DocumentUploadService;
import com.uol.finalproject.edulearn.services.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.stream.Collectors;

import static com.uol.finalproject.edulearn.util.Constants.INVALID_LOGIN_CREDENTIALS_MESSAGE;
import static com.uol.finalproject.edulearn.util.Constants.SUCCESS_LOGIN_CREDENTIALS_MESSAGE;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final StudentUserRepository studentUserRepository;
    private final DocumentUploadService documentUploadService;

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
        if (Strings.isNotBlank(studentUserDTO.getLocation())) studentUser.setLocation(studentUserDTO.getLocation());


        if (studentUserDTO.getSocialProfile() != null) {
            handleSocialProfileLinksUpdate(studentUserDTO, studentUser);
        }

        if (!studentUserDTO.getCertifications().isEmpty()) {
            studentUserDTO.getCertifications().forEach(certification -> certification.setStudentUser(studentUser));
            studentUser.getCertifications().clear();
            studentUser.getCertifications().addAll(studentUserDTO.getCertifications());
        }

        return StudentUserDTO.fromStudentUser(studentUserRepository.save(studentUser));
    }

    private static void handleSocialProfileLinksUpdate(StudentUserDTO studentUserDTO, StudentUser studentUser) {
        if (studentUser.getSocialProfile() == null) studentUser.setSocialProfile(UserSocialProfile.builder()
                        .studentUser(studentUser)
                .build());
        if (Strings.isNotBlank(studentUserDTO.getSocialProfile().getLinkedInUrl())) studentUser.getSocialProfile().setLinkedInUrl(studentUserDTO.getSocialProfile().getLinkedInUrl());
        if (Strings.isNotBlank(studentUserDTO.getSocialProfile().getGithubUrl())) studentUser.getSocialProfile().setGithubUrl(studentUserDTO.getSocialProfile().getGithubUrl());
        if (Strings.isNotBlank(studentUserDTO.getSocialProfile().getTwitterUrl())) studentUser.getSocialProfile().setTwitterUrl(studentUserDTO.getSocialProfile().getTwitterUrl());
        if (Strings.isNotBlank(studentUserDTO.getSocialProfile().getDiscordUrl())) studentUser.getSocialProfile().setDiscordUrl(studentUserDTO.getSocialProfile().getDiscordUrl());
    }

    @Override
    public UserDTO getUserDetails(String userId) {
        User user = userRepository.findByUsername(userId).orElseThrow(() -> new ResourceNotFoundException("User with email was not found"));
        return UserDTO.fromUser(user);
    }

    @Override
    public User getLoggedInUserDetailsAndReturnEntity() {
        String userEmail = getLoggedInUser().getUsername();
        return userRepository.findByUsername(userEmail).orElseThrow(() -> new ResourceNotFoundException("User with email was not found"));
    }

    private boolean isLoggedInUserAuthorized(StudentUserDTO studentUserDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            String loggedInUserEmail = ((UserDetails) authentication.getPrincipal()).getUsername();
            return loggedInUserEmail.equals(studentUserDTO.getEmail());
        }
        return false;
    }

    @Override
    public UserDetails getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return ((UserDetails) authentication.getPrincipal());
        }
        throw new AuthorizationException("User is not authorized to access resource");
    }


    @Override
    public Page<StudentUserDTO> getActiveUsersOnline(PageRequest pageRequest) {
        Page<StudentUser> onlineUsers = studentUserRepository.findAllByUserLoginStatusAndUser_IsActive(true, true, pageRequest);

        return new PageImpl<>(onlineUsers.stream().map(StudentUserDTO::fromStudentUser).collect(Collectors.toList()), pageRequest, onlineUsers.getTotalElements());
    }

    @Override
    public BaseApiResponseDTO getUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();

        User user = findByUsername(userName).orElseThrow(() -> new AuthenticationException(INVALID_LOGIN_CREDENTIALS_MESSAGE));

        LoginResponseDTO loginResponseDTO = new LoginResponseDTO(UserDTO.fromUser(user), null, null);
        return new BaseApiResponseDTO(SUCCESS_LOGIN_CREDENTIALS_MESSAGE, loginResponseDTO, null);
    }

    @Override
    public StudentUserDTO editProfileImage(String userId, MultipartFile file) {

        StudentUser studentUser = studentUserRepository.findByEmail(getLoggedInUser().getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User with email was not found"));
        User user = userRepository.findByUsername(studentUser.getEmail()).orElseThrow(() -> new ResourceNotFoundException("User with email was not found"));
        if (!user.isActive()) throw new AuthorizationException("User is not authorized to carry out action");

        String profileImageUrl = documentUploadService.uploadDocument(file);
        studentUser.setImageUrl(profileImageUrl);
        return StudentUserDTO.fromStudentUser(studentUserRepository.save(studentUser));
    }

    @Override
    public void updateLoggedInStatus(boolean isLoggedIn, String userEmail) {
        studentUserRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User with email was not found"));
        User user = userRepository.findByUsername(userEmail).orElseThrow(() -> new ResourceNotFoundException("User with email was not found"));
        if (!user.isActive()) throw new AuthorizationException("User is not authorized to carry out action");

        studentUserRepository.updateUserLoginStatus(isLoggedIn, userEmail);
    }

}
