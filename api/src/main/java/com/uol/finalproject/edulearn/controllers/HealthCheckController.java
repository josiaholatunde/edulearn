package com.uol.finalproject.edulearn.controllers;

import com.uol.finalproject.edulearn.apimodel.response.BaseApiResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class HealthCheckController {

    @GetMapping("/health-check")
    public BaseApiResponseDTO healthCheck() {
        return new BaseApiResponseDTO("Success response from the server");
    }
}
