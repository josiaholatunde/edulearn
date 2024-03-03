package com.uol.mobileweb.gevs_election_polls.repositories;

import com.uol.mobileweb.gevs_election_polls.entities.User;
import com.uol.mobileweb.gevs_election_polls.entities.Voter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoterRepository extends JpaRepository<Voter, String> {

    boolean existsByUVC(String UVC);
}
