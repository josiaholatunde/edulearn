package com.uol.finalproject.edulearn.converters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;
import java.util.LinkedHashMap;

@Converter
public class LinkedHashMapConverter implements AttributeConverter<LinkedHashMap<String, Object>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(LinkedHashMap<String, Object> attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            // Handle the exception appropriately, e.g., log it or throw a runtime exception
            return null;
        }
    }

    @Override
    public LinkedHashMap<String, Object> convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, LinkedHashMap.class);
        } catch (IOException e) {
            // Handle the exception appropriately, e.g., log it or throw a runtime exception
            return null;
        }
    }
}
