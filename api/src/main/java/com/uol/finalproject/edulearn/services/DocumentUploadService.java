package com.uol.finalproject.edulearn.services;

import org.springframework.web.multipart.MultipartFile;

public interface DocumentUploadService {


    String uploadDocument(MultipartFile multipartFile);
}
