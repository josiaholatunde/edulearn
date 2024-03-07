package com.uol.finalproject.edulearn;

import com.uol.finalproject.edulearn.entities.User;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import com.uol.finalproject.edulearn.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class EduLearnApplication implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static final String DEFAULT_ADMIN_USERNAME = "admin@edulearn";
    private static final String DEFAULT_ADMIN_PASSWORD = "password";


    @Autowired
    public EduLearnApplication(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public static void main(String[] args) {
        SpringApplication.run(EduLearnApplication.class, args);
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (!userRepository.findByUsername(DEFAULT_ADMIN_USERNAME).isPresent()) {
            User admin = new User(DEFAULT_ADMIN_USERNAME, passwordEncoder.encode(DEFAULT_ADMIN_PASSWORD), true, RoleType.ADMIN, null);
            userRepository.save(admin);
        }
    }

}
