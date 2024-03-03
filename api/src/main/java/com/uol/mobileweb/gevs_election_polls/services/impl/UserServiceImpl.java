package com.uol.mobileweb.gevs_election_polls.services.impl;

import com.uol.mobileweb.gevs_election_polls.entities.User;
import com.uol.mobileweb.gevs_election_polls.repositories.UserRepository;
import com.uol.mobileweb.gevs_election_polls.services.UserService;
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
