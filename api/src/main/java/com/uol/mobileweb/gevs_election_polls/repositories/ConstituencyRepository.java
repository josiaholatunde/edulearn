package com.uol.mobileweb.gevs_election_polls.repositories;

import com.uol.mobileweb.gevs_election_polls.entities.Constituency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConstituencyRepository extends JpaRepository<Constituency, Integer> {

   Optional<Constituency> findByConstituencyName(String name);
}
