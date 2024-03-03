package com.uol.mobileweb.gevs_election_polls.services;

import com.uol.mobileweb.gevs_election_polls.apimodel.response.ElectoralDistrictResponseDTO;
import com.uol.mobileweb.gevs_election_polls.entities.Constituency;

import java.util.List;

public interface ElectoralDistrictService {

    ElectoralDistrictResponseDTO getElectoralDistrictVoteCount(String constituencyName);

    List<Constituency> getConstituencies();
}
