package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.entities.User;

import java.util.Optional;

public interface UserService {

    Optional<User> findByUsername(String username);
}
