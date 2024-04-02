package com.uol.finalproject.edulearn.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.uol.finalproject.edulearn.exceptions.EduLearnServerException;
import com.uol.finalproject.edulearn.services.DocumentUploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class CloudinaryDocumentUploadServiceImpl implements DocumentUploadService {

    private final Cloudinary cloudinary;
    private static final String DEFAULT_FOLDER_NAME="edulearn";

    public String uploadDocument(MultipartFile multipartFile) {
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(multipartFile.getBytes(), ObjectUtils.asMap("folder", DEFAULT_FOLDER_NAME));
            return (String) uploadResult.get("url");
        } catch (IOException ex) {
            log.error(ex.getMessage(), ex);
            throw new EduLearnServerException("An unexpected error occurred while uploading image");
        }
    }
}
