package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.entities.enums.AuthProvider;
import com.uol.finalproject.edulearn.services.JwtValidator;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class DefaultJwtValidator implements JwtValidator  {

    @Value("${auth.jwt-secret:AHHSHSGSGSGSGSSGSGSG}")
    private String jwtSecret;
    

    @Override
    public AuthProvider getAuthProvider() {
        return AuthProvider.SYSTEM;
    }

    @Override
    public boolean validateJwt(String authorizationToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authorizationToken);
            return true;
        } catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    @Override
    public String getUsernameFromJwt(String jwtToken) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwtToken).getBody().getSubject();
    }
}
