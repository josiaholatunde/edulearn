package com.uol.mobileweb.gevs_election_polls.apimodel.request;

import com.uol.mobileweb.gevs_election_polls.apimodel.request.enums.ElectionAction;

public class UpdateElectionDTO {

    private ElectionAction electionAction;


    public UpdateElectionDTO() {
    }


    public ElectionAction getElectionAction() {
        return electionAction;
    }

    public void setElectionAction(ElectionAction electionAction) {
        this.electionAction = electionAction;
    }
}
