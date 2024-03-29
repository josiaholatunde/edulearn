package com.uol.finalproject.edulearn.services.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.uol.finalproject.edulearn.apimodel.CodeJudgeBatchResponse;
import com.uol.finalproject.edulearn.apimodel.CodeJudgeSubmitResponse;
import com.uol.finalproject.edulearn.exceptions.BadRequestException;
import com.uol.finalproject.edulearn.services.CodeJudgeRestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class Judge0RestServiceImpl implements CodeJudgeRestService {

    private final RestTemplate restTemplate;

    @Value("${judge0.base.url:https://judge0-ce.p.rapidapi.com}")
    private String judge0BaseURL;
    @Value("${judge0.x-rapid.api-key:bb6f56afafmsh0ff1bd6fade0729p18eecfjsn0c76c2982fb6}")
    private String xRapidAPIKEY;

    @Value("${judge0.x-rapid.api-host:judge0-ce.p.rapidapi.com}")
    private String xRapidAPIHost;

    private static final ObjectMapper objectMapper = new ObjectMapper();
    static {
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Override
    public List<CodeJudgeSubmitResponse> executeCode(Object requestBody) throws Exception {
        try {
            HttpHeaders httpHeaders = buildHttpHeaders();
            log.info("Request Body {} Headers {}", requestBody, httpHeaders);
            String apiUrl = String.format("%s/submissions/batch?wait=true", judge0BaseURL);
            ResponseEntity<String> result = restTemplate.exchange(apiUrl, HttpMethod.POST, new HttpEntity<>(requestBody, httpHeaders), String.class);
            log.info("Response from Code judge Request: {} Response {}", requestBody, result);
            if (result.getBody() != null) {
                return objectMapper.readValue(result.getBody(), new TypeReference<List<CodeJudgeSubmitResponse>>() {});
            }
            log.error("Received null response from Judge 0's API");
        } catch (ResourceAccessException ex) {
            log.error("A resource access error occurred while calling code judge service", ex);
            throw new Exception("Unable to reach code judge server");
        } catch (HttpClientErrorException ex) {
            log.error("A client error occurred while calling code judge service", ex);
            throw new BadRequestException("A client error occurred while communicating with code judge");
        } catch (HttpServerErrorException ex) {
            log.error("A server error occurred while calling Keystone bank's service", ex);
            throw new Exception("Server error occurred");
        }

        return null;
    }

    private HttpHeaders buildHttpHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("X-RapidAPI-Key", xRapidAPIKEY);
        httpHeaders.add("X-RapidAPI-Host", xRapidAPIHost);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return httpHeaders;
    }


    @Override
    public CodeJudgeBatchResponse getSubmissionsBatch(String suffixUrl) throws Exception {
        try {
            HttpHeaders httpHeaders = buildHttpHeaders();

            String apiUrl = String.format("%s%s", judge0BaseURL, suffixUrl);
            ResponseEntity<String> result = restTemplate.exchange(apiUrl, HttpMethod.GET, new HttpEntity<>(httpHeaders), String.class);
            log.info("Response from Code judge Request: {} Response {}", apiUrl, result);
            if (result.getBody() != null) {
                return objectMapper.readValue(result.getBody(), CodeJudgeBatchResponse.class);
            }
            log.error("Received null response from Judge 0's API");
        } catch (ResourceAccessException ex) {
            log.error("A resource access error occurred while calling code judge service", ex);
            throw new Exception("Unable to reach code judge server");
        } catch (HttpClientErrorException ex) {
            log.error("A client error occurred while calling code judge service", ex);
            throw new BadRequestException("A client error occurred while communicating with code judge");
        } catch (HttpServerErrorException ex) {
            log.error("A server error occurred while calling Keystone bank's service", ex);
            throw new Exception("Server error occurred");
        }

        return null;
    }
}
