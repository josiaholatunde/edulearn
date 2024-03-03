package com.uol.mobileweb.gevs_election_polls.services.impl;

import com.uol.mobileweb.gevs_election_polls.apimodel.request.RegisterVoterDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.BaseApiResponseDTO;
import com.uol.mobileweb.gevs_election_polls.apimodel.response.LoginResponseDTO;
import com.uol.mobileweb.gevs_election_polls.entities.Constituency;
import com.uol.mobileweb.gevs_election_polls.entities.UVCCode;
import com.uol.mobileweb.gevs_election_polls.entities.User;
import com.uol.mobileweb.gevs_election_polls.entities.Voter;
import com.uol.mobileweb.gevs_election_polls.entities.enums.RoleType;
import com.uol.mobileweb.gevs_election_polls.exceptions.AuthenticationException;
import com.uol.mobileweb.gevs_election_polls.exceptions.BadRequestException;
import com.uol.mobileweb.gevs_election_polls.exceptions.ResourceNotFoundException;
import com.uol.mobileweb.gevs_election_polls.repositories.ConstituencyRepository;
import com.uol.mobileweb.gevs_election_polls.repositories.UVCCodeRepository;
import com.uol.mobileweb.gevs_election_polls.repositories.UserRepository;
import com.uol.mobileweb.gevs_election_polls.repositories.VoterRepository;
import com.uol.mobileweb.gevs_election_polls.services.AuthService;
import com.uol.mobileweb.gevs_election_polls.services.UserService;
import com.uol.mobileweb.gevs_election_polls.util.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.uol.mobileweb.gevs_election_polls.util.Constants.INVALID_LOGIN_CREDENTIALS_MESSAGE;
import static com.uol.mobileweb.gevs_election_polls.util.Constants.SUCCESS_LOGIN_CREDENTIALS_MESSAGE;

@Service
public class AuthServiceImpl implements AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final UserRepository userRepository;
    private final VoterRepository voterRepository;
    private final ConstituencyRepository constituencyRepository;
    private final UVCCodeRepository uvcCodeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserService userService,
                           UserRepository userRepository, VoterRepository voterRepository,
                           ConstituencyRepository constituencyRepository, UVCCodeRepository uvcCodeRepository,
                           PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userService = userService;
        this.userRepository = userRepository;
        this.voterRepository = voterRepository;
        this.constituencyRepository = constituencyRepository;
        this.uvcCodeRepository = uvcCodeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public BaseApiResponseDTO loginUser(String userName, String password) throws AuthenticationException {
        try {
            User user = userService.findByUsername(userName).orElseThrow(() -> new AuthenticationException(INVALID_LOGIN_CREDENTIALS_MESSAGE));
            if (!user.isActive()) throw new AuthenticationException("User is inactive. Kindly contact admin");
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, password));
            SecurityContextHolder.getContext().setAuthentication(authenticate);
            String jwtToken = jwtUtils.generateJwtToken(authenticate);

            LoginResponseDTO loginResponseDTO = new LoginResponseDTO(user, jwtToken, jwtUtils.convertJwtExpiryToMilliSeconds());
            return new BaseApiResponseDTO(SUCCESS_LOGIN_CREDENTIALS_MESSAGE, loginResponseDTO, null);
        } catch (BadCredentialsException ex) {
            log.error("An error occurred while logging in user {}", ex.getMessage());
            throw new AuthenticationException(INVALID_LOGIN_CREDENTIALS_MESSAGE);
        }

    }

    @Override
    public BaseApiResponseDTO registerVoter(RegisterVoterDTO registerVoterDTO) {
        if (voterRepository.existsById(registerVoterDTO.getVoterId())) throw new BadRequestException("Voter id already exists");
        Optional<UVCCode> uvcCodeOptional = uvcCodeRepository.findFirstByUVC(registerVoterDTO.getUvc());
        if (!uvcCodeOptional.isPresent()) throw new BadRequestException("Invalid uvc code. Kindly check again");
        else if (uvcCodeOptional.isPresent() && uvcCodeOptional.get().isUsed()) throw new BadRequestException("UVC code has been taken by another voter. Kindly check again");

        if (voterRepository.existsByUVC(registerVoterDTO.getUvc())) throw new BadRequestException("UVC code has been taken by another voter. Kindly check again");

        UVCCode uvc = uvcCodeOptional.get();
        String hashedPassword = passwordEncoder.encode(registerVoterDTO.getPassword());
        Constituency constituency = constituencyRepository.findById(registerVoterDTO.getConstituencyId()).orElseThrow(() -> new ResourceNotFoundException("Invalid constituency id"));

        Voter voter = new Voter(registerVoterDTO.getVoterId(), registerVoterDTO.getFullName(), registerVoterDTO.getDateOfBirth(), hashedPassword, registerVoterDTO.getUvc(), constituency);
        voter = voterRepository.save(voter);

        User user = new User(registerVoterDTO.getVoterId(), hashedPassword, true, RoleType.VOTER, voter);
        userRepository.save(user);

        uvc.setUsed(true);
        uvcCodeRepository.save(uvc);

        return new BaseApiResponseDTO("Successfully registered voter", voter, null);
    }
}
