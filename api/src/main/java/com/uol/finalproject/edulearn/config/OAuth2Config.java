package com.uol.finalproject.edulearn.config;

import com.fasterxml.jackson.core.JsonFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.IdTokenClaimNames;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class OAuth2Config {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

//    @Value("${spring.security.oauth2.client.registration.redirect-url}")
//    private String redirectUrl;

//    @Value("${spring.security.oauth2.client.registration.facebook.client-id}")
//    private String facebookClientId;
//
//    @Value("${spring.security.oauth2.client.registration.facebook.client-secret}")
//    private String facebookClientSecret;


//    @Bean
//    public ClientRegistrationRepository clientRegistrationRepository() {
//        return new InMemoryClientRegistrationRepository(Arrays.asList(getGoogleClientRegistration()
//                ));
//    }

//    private ClientRegistration getGoogleClientRegistration() {
//        return ClientRegistration.withRegistrationId("google")
//                .clientId(googleClientId)
//                .clientSecret(googleClientSecret)
//                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_JWT)
//                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
//                .redirectUri("http://localhost:9990/login/oauth2/code/google")
//                .scope("openid", "profile", "email")
//                .authorizationUri("https://accounts.google.com/o/oauth2/auth")
//                .tokenUri("https://www.googleapis.com/oauth2/v3/token")
//                .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
//                .userNameAttributeName(IdTokenClaimNames.SUB)
//                .clientName("Google")
//                .build();
//    }


    @Bean
    public GoogleIdTokenVerifier googleIdTokenVerifier() {
        return new GoogleIdTokenVerifier
                .Builder(new NetHttpTransport(), GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(googleClientId))
                .build();
    }

//    private ClientRegistration getFacebookClientRegistration() {
//        return ClientRegistration.withRegistrationId("facebook")
//                .clientId(facebookClientId)
//                .clientSecret(facebookClientSecret)
//                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
//                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
//                .redirectUri(redirectUrl)
//                .scope("email")
//                .authorizationUri("https://www.facebook.com/v12.0/dialog/oauth")
//                .tokenUri("https://graph.facebook.com/v12.0/oauth/access_token")
//                .userInfoUri("https://graph.facebook.com/me?fields=id,name,email")
//                .userNameAttributeName("id")
//                .clientName("Facebook")
//                .build();
//    }
}
