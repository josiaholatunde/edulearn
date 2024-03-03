package com.uol.mobileweb.gevs_election_polls.services;

import com.uol.mobileweb.gevs_election_polls.apimodel.request.RegisterVoterDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.BaseApiResponseDTO;
import com.uol.mobileweb.gevs_election_polls.exceptions.AuthenticationException;

public interface AuthService {

    BaseApiResponseDTO loginUser(String userName, String password) throws AuthenticationException;

    BaseApiResponseDTO registerVoter(RegisterVoterDTO registerVoterDTO);
}
