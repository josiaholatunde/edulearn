package com.uol.mobileweb.gevs_election_polls.repositories;

import com.uol.mobileweb.gevs_election_polls.entities.UVCCode;
import com.uol.mobileweb.gevs_election_polls.entities.Voter;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UVCCodeRepository extends JpaRepository<UVCCode, String> {

    Optional<UVCCode> findFirstByUVCAndUsed(String UVC, boolean used);
    Optional<UVCCode> findFirstByUVC(String UVC);
}
