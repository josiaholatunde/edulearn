package com.uol.finalproject.edulearn.advice;

import com.uol.mobileweb.gevs_election_polls.apimodel.response.BaseApiResponseDTO;
import com.uol.mobileweb.gevs_election_polls.exceptions.AuthenticationException;
import com.uol.mobileweb.gevs_election_polls.exceptions.BadRequestException;
import com.uol.mobileweb.gevs_election_polls.exceptions.ResourceNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException ex, HttpServletRequest request) {
        System.out.println(request);
        return new ResponseEntity<>(new BaseApiResponseDTO(ex.getMessage()), HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<?> handleAuthenticationException(AuthenticationException ex, HttpServletRequest request) {
        System.out.println(request);
        return new ResponseEntity<>(new BaseApiResponseDTO(ex.getMessage()), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<?> handleBadRequestException(BadRequestException ex, HttpServletRequest request) {
        System.out.println(request);
        return new ResponseEntity<>(new BaseApiResponseDTO(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }
}
