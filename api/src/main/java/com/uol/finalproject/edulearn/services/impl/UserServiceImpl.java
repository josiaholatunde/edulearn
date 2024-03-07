package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.entities.User;
import com.uol.finalproject.edulearn.repositories.UserRepository;
import com.uol.finalproject.edulearn.services.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}
