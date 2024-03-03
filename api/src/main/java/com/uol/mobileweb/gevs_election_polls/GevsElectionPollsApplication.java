package com.uol.mobileweb.gevs_election_polls;

import com.uol.mobileweb.gevs_election_polls.entities.User;
import com.uol.mobileweb.gevs_election_polls.entities.enums.RoleType;
import com.uol.mobileweb.gevs_election_polls.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class GevsElectionPollsApplication implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static final String DEFAULT_ADMIN_USERNAME = "election@shangrila.gov.sr";
    private static final String DEFAULT_ADMIN_PASSWORD = "shangrila2024$";


    @Autowired
    public GevsElectionPollsApplication(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public static void main(String[] args) {
        SpringApplication.run(GevsElectionPollsApplication.class, args);
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (!userRepository.findByUsername(DEFAULT_ADMIN_USERNAME).isPresent()) {
            User admin = new User(DEFAULT_ADMIN_USERNAME, passwordEncoder.encode(DEFAULT_ADMIN_PASSWORD), true, RoleType.ADMIN, null);
            userRepository.save(admin);
        }
    }

}
