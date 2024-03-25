package com.uol.finalproject.edulearn.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uol.finalproject.edulearn.apimodel.CodeJudgeBatchResponse;
import com.uol.finalproject.edulearn.services.CodeJudgeRestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class Judge0RestServiceImpl implements CodeJudgeRestService {

    private static final String BASE_URL = "https://judge0-ce.p.rapidapi.com";
    private final RestTemplate restTemplate;

    public CodeJudgeBatchResponse executeCode(Object requestBody) {
        try {
            HttpHeaders httpHeaders = new HttpHeaders();

            String apiUrl = String.format("%s/submissions?wait=true", BASE_URL);
            ResponseEntity<String> result = restTemplate.exchange(apiUrl, HttpMethod.POST, new HttpEntity<>(requestBody, httpHeaders), String.class);
            log.info("Response from Code judge Request: {} Response {}", requestBody, result);
            if (result.getBody() != null) {
                ObjectMapper objectMapper = new ObjectMapper();
                return objectMapper.convertValue(result.getBody(), CodeJudgeBatchResponse.class);
            }
            log.error("Received null response from Judge 0's API");
        } catch (ResourceAccessException ex) {
            log.error("A resource access error occurred while calling Keystone bank's service", ex);

        } catch (HttpClientErrorException ex) {
            log.error("A client error occurred while calling Keystone bank's service", ex);

        } catch (HttpServerErrorException ex) {
            log.error("A server error occurred while calling Keystone bank's service", ex);
        }

        return null;
    }
}
