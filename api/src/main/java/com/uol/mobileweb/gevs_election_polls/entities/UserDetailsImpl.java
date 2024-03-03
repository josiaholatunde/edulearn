package com.uol.mobileweb.gevs_election_polls.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String email;

    private boolean isEnabled;

    @JsonIgnore
    private String password;

    private Collection<? extends  GrantedAuthority> authorities;

    public UserDetailsImpl(Long id, String email, String password,
                           boolean isEnabled, Collection<? extends GrantedAuthority> authorities) {

        this.id = id;
        this.email = email;
        this.password = password;
        this.isEnabled = isEnabled;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isEnabled;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

    public static UserDetailsImpl build(User user) {
        return new UserDetailsImpl(
                user.getId(), user.getUsername(), user.isActive(), user.getPassword(), new ArrayList<>());
    }

    public UserDetailsImpl(Long id, String email, boolean isEnabled, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.isEnabled = isEnabled;
        this.password = password;
        this.authorities = authorities;
    }
}