package com.uol.mobileweb.gevs_election_polls.entities;

import com.uol.mobileweb.gevs_election_polls.entities.enums.RoleType;
import jakarta.persistence.*;

@Entity(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;

    private boolean isActive = true;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @OneToOne
    @JoinColumn(name = "voter_id", referencedColumnName = "voter_id")
    private Voter voter;


    public User() {
    }

    public User(String username, String password, boolean isActive, RoleType roleType, Voter voter) {
        this.username = username;
        this.password = password;
        this.isActive = isActive;
        this.roleType = roleType;
        this.voter = voter;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public RoleType getRoleType() {
        return roleType;
    }

    public void setRoleType(RoleType roleType) {
        this.roleType = roleType;
    }


    public Voter getVoter() {
        return voter;
    }

    public void setVoter(Voter voter) {
        this.voter = voter;
    }
}
