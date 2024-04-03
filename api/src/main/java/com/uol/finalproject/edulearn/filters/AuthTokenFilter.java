package com.uol.finalproject.edulearn.filters;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.uol.finalproject.edulearn.entities.enums.AuthProvider;
import com.uol.finalproject.edulearn.services.JwtValidator;
import com.uol.finalproject.edulearn.services.impl.DefaultJwtValidator;
import com.uol.finalproject.edulearn.services.impl.GoogleJwtValidator;
import com.uol.finalproject.edulearn.util.JwtUtils;
import jakarta.annotation.PostConstruct;
import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthTokenFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(AuthTokenFilter.class);

    private JwtUtils jwtUtils;

    private UserDetailsService userDetailService;

    private final GoogleIdTokenVerifier googleIdTokenVerifier;
    private final DefaultJwtValidator defaultJwtValidator;
    private final GoogleJwtValidator googleJwtValidator;
    private final Map<AuthProvider, JwtValidator> jwtValidatorMap = new HashMap<>();

    @PostConstruct
    public void init() {
        jwtValidatorMap.put(AuthProvider.GOOGLE, googleJwtValidator);
        jwtValidatorMap.put(AuthProvider.SYSTEM, defaultJwtValidator);
    }

    @Autowired
    public AuthTokenFilter(JwtUtils jwtUtils, UserDetailsService userDetailService, GoogleIdTokenVerifier googleIdToken, DefaultJwtValidator defaultJwtValidator, GoogleJwtValidator googleJwtValidator) {
        this.jwtUtils = jwtUtils;
        this.userDetailService = userDetailService;
        this.googleIdTokenVerifier = googleIdToken;
        this.defaultJwtValidator = defaultJwtValidator;
        this.googleJwtValidator = googleJwtValidator;
    }



    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = retrieveJwtFromRequestHeader(httpServletRequest);
            AuthProvider authProvider = AuthProvider.GOOGLE.toString().equals(httpServletRequest.getHeader("sign-in-mode")) ? AuthProvider.GOOGLE : AuthProvider.SYSTEM;
            if (jwt != null && jwtValidatorMap.get(authProvider).validateJwt(jwt)) {
                String email = jwtValidatorMap.get(authProvider).getUsernameFromJwt(jwt);
                UserDetails userDetails = userDetailService.loadUserByUsername(email);
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        } catch (Exception ex) {
            log.error("An error occurred while setting user authentication {}", ex.getMessage(), ex);
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private String retrieveJwtFromRequestHeader(HttpServletRequest httpServletRequest) {
        String authHeader = httpServletRequest.getHeader("Authorization");
        if (!Strings.isBlank(authHeader) && authHeader.startsWith("Bearer ")) {
           return authHeader.substring(7, authHeader.length());
        }
        return null;
    }

}