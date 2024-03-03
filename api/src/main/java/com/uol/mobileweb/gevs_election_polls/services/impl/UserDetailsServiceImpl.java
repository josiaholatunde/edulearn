package com.uol.mobileweb.gevs_election_polls.services.impl;

import com.uol.mobileweb.gevs_election_polls.entities.User;
import com.uol.mobileweb.gevs_election_polls.entities.UserDetailsImpl;
import com.uol.mobileweb.gevs_election_polls.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(() ->
                new UsernameNotFoundException(String.format("User with email %s not found on system", username)));
        return UserDetailsImpl.build(user);
    }
}

