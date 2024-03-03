package com.uol.mobileweb.gevs_election_polls.repositories;

import com.uol.mobileweb.gevs_election_polls.apimodel.ConstituencyWinnerCandidateDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.ElectoralDistrictDTO;
import com.uol.mobileweb.gevs_election_polls.entities.Candidate;
import com.uol.mobileweb.gevs_election_polls.entities.Constituency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {

    @Query("SELECT new com.uol.mobileweb.gevs_election_polls.apimodel.ElectoralDistrictDTO(c.candidate, c.party.party, c.voteCount) FROM Candidate c WHERE c.constituency=?1")
    List<ElectoralDistrictDTO> getConstituencyResult(Constituency constituency);

    List<Candidate> findAllByConstituency(Constituency constituency);


    @Query(value = "SELECT " +
            "    rc.consitituency_id as constituency, " +
            "    p.party as party, " +
            "    COALESCE(rc.vote_count, 0) as vote_count, " +
            "    p.party_id as party_id " +
            "FROM ( " +
            "    SELECT " +
            "        c.consitituency_id, " +
            "        c.party_id, " +
            "        c.vote_count, " +
            "        DENSE_RANK() OVER (PARTITION BY c.consitituency_id ORDER BY c.vote_count DESC) AS VoteRank, " +
            "        COUNT(*) OVER (PARTITION BY c.consitituency_id, c.vote_count) AS CandidateCount " +
            "    FROM " +
            "        Candidate c " +
            ") AS rc " +
            "LEFT JOIN " +
            "    Party p ON rc.party_id = p.party_id " +
            "WHERE " +
            "    rc.VoteRank = 1 " +
            "    AND rc.CandidateCount = 1", nativeQuery = true)
    List<Object[]> getWinnerPartyForAllConstituencies();

}
