package com.uol.mobileweb.gevs_election_polls.apimodel.response;

import com.uol.mobileweb.gevs_election_polls.entities.User;

public class LoginResponseDTO {


    private User user;

    private String token;

    private Long expiresIn;


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }


    public LoginResponseDTO(User user, String token, Long expiresIn) {
        this.user = user;
        this.token = token;
        this.expiresIn = expiresIn;
    }
}
