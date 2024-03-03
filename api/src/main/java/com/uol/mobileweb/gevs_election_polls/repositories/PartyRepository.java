package com.uol.mobileweb.gevs_election_polls.repositories;

import com.uol.mobileweb.gevs_election_polls.entities.Party;
import com.uol.mobileweb.gevs_election_polls.entities.Voter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {

    Optional<Party> findFirstByParty(String party);
}
