package com.uol.mobileweb.gevs_election_polls.services;

import com.uol.mobileweb.gevs_election_polls.apimodel.request.UpdateElectionDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.ElectoralResultDTO;
import com.uol.mobileweb.gevs_election_polls.entities.Election;

public interface ElectionService {

    Election updateElectionStatus(UpdateElectionDTO updateElectionDTO);

    Election getElectionDetails();

    ElectoralResultDTO getResultDetails();
}
