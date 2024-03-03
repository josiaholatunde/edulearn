package com.uol.mobileweb.gevs_election_polls.apimodel.response;

import com.uol.mobileweb.gevs_election_polls.apimodel.ElectoralDistrictDTO;

import java.util.ArrayList;
import java.util.List;

public class ElectoralDistrictResponseDTO {

    private String constituency;

    private List<ElectoralDistrictDTO> result = new ArrayList<>();


    public String getConstituency() {
        return constituency;
    }

    public void setConstituency(String constituency) {
        this.constituency = constituency;
    }

    public List<ElectoralDistrictDTO> getResult() {
        return result;
    }

    public void setResult(List<ElectoralDistrictDTO> result) {
        this.result = result;
    }

    public ElectoralDistrictResponseDTO(String constituency, List<ElectoralDistrictDTO> result) {
        this.constituency = constituency;
        this.result = result;
    }
}
