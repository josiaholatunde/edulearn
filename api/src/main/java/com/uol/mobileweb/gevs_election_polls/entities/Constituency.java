package com.uol.mobileweb.gevs_election_polls.entities;

import jakarta.persistence.*;

@Entity
public class Constituency {
    @Id
    @GeneratedValue
    @Column(name = "consitituency_id")
    private int constituencyId;

    @Column(name = "constituency_name")
    private String constituencyName;


    public Constituency() {
    }

    public int getConstituencyId() {
        return constituencyId;
    }

    public void setConstituencyId(int constituencyId) {
        this.constituencyId = constituencyId;
    }

    public String getConstituencyName() {
        return constituencyName;
    }

    public void setConstituencyName(String constituencyName) {
        this.constituencyName = constituencyName;
    }
}
