package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.apimodel.StudentUserDTO;
import com.uol.finalproject.edulearn.apimodel.UserDTO;
import com.uol.finalproject.edulearn.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserService {

    Optional<User> findByUsername(String username);

    StudentUserDTO editUser(StudentUserDTO studentUserDTO, String userId);

    UserDTO getUserDetails(String userId);

    UserDetails getLoggedInUser();

    Page<StudentUserDTO> getActiveUsersOnline(PageRequest pageRequest);
}
