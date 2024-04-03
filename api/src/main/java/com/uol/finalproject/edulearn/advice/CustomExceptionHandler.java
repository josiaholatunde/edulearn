package com.uol.finalproject.edulearn.advice;

import com.uol.finalproject.edulearn.apimodel.response.BaseApiResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(CustomExceptionHandler.class);

    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        String error = "Required parameter '" + ex.getParameterName() + "' is not present.";
        log.error("{} {} {} {} {}", LocalDateTime.now(), status.value(), status.getReasonPhrase(), error, request.getDescription(false));


        return new ResponseEntity<>(new BaseApiResponseDTO(error), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

}
