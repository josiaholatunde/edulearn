package com.uol.finalproject.edulearn.controllers;

import com.uol.finalproject.edulearn.apimodel.response.BaseApiResponseDTO;
import com.uol.finalproject.edulearn.services.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OAuth2Controller {

    private final OAuth2AuthorizedClientService clientService;
    private final AuthService authService;


    @GetMapping("/login/oauth2/code/{provider}")
    public BaseApiResponseDTO loginSuccess(@PathVariable String provider, @AuthenticationPrincipal OAuth2User principal) {
        log.info("Login info {}", principal);
        String userEmail = principal.getName();

        return authService.authenticateUserOauth(provider, userEmail, principal);
    }
}
