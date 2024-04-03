package com.uol.finalproject.edulearn.converters;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;

@Converter(autoApply = true)
public class JsonNodeConverter implements AttributeConverter<JsonNode, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(JsonNode jsonNode) {
        if (jsonNode == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(jsonNode);
        } catch (IOException ex) {
            throw new IllegalArgumentException("Error converting JsonNode to String: " + ex.getMessage(), ex);
        }
    }

    @Override
    public JsonNode convertToEntityAttribute(String jsonStr) {
        if (jsonStr == null || jsonStr.isEmpty()) {
            return null;
        }
        try {
            return objectMapper.readTree(jsonStr);
        } catch (IOException ex) {
            throw new IllegalArgumentException("Error converting String to JsonNode: " + ex.getMessage(), ex);
        }
    }
}
