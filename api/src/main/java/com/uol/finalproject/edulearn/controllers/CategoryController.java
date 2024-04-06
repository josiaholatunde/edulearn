package com.uol.finalproject.edulearn.controllers;

import com.uol.finalproject.edulearn.apimodel.request.LoginRequestDTO;
import com.uol.finalproject.edulearn.apimodel.request.RegisterStudentUserDTO;
import com.uol.finalproject.edulearn.apimodel.response.BaseApiResponseDTO;
import com.uol.finalproject.edulearn.entities.Category;
import com.uol.finalproject.edulearn.services.AuthService;
import com.uol.finalproject.edulearn.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public Page<Category> getCategories(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return categoryService.getCategories(PageRequest.of(page, size));
    }

    @PostMapping
    public
}
