package com.uol.mobileweb.gevs_election_polls.repositories;

import com.uol.mobileweb.gevs_election_polls.entities.Election;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ElectionRepository extends JpaRepository<Election, Long> {

    Optional<Election> findFirstByOrderByCreatedAtDesc();
}
