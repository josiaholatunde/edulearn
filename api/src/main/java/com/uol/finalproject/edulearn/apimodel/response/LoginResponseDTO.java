package com.uol.finalproject.edulearn.apimodel.response;

import com.uol.finalproject.edulearn.apimodel.UserDTO;
import com.uol.finalproject.edulearn.entities.User;

public class LoginResponseDTO {


    private UserDTO user;

    private String token;

    private Long expiresIn;


    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
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


    public LoginResponseDTO(UserDTO user, String token, Long expiresIn) {
        this.user = user;
        this.token = token;
        this.expiresIn = expiresIn;
    }
}
