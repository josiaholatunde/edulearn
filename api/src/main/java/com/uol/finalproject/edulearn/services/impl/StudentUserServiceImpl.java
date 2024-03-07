package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.repositories.StudentUserRepository;
import com.uol.finalproject.edulearn.services.StudentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentUserServiceImpl implements StudentUserService  {

    private final StudentUserRepository studentUserRepository;



}
