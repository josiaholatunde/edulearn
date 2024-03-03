package com.uol.mobileweb.gevs_election_polls.services;

import com.uol.mobileweb.gevs_election_polls.entities.User;

import java.util.Optional;

public interface UserService {

    Optional<User> findByUsername(String username);
}
