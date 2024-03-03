package com.uol.mobileweb.gevs_election_polls.apimodel.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseApiResponseDTO {
    private String message;

    private Object data;

    private List<String> errors;

    public BaseApiResponseDTO(String message) {
        this.message = message;
    }

    public BaseApiResponseDTO(String message, Object data, List<String> errors) {
        this.message = message;
        this.data = data;
        this.errors = errors;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }
}
