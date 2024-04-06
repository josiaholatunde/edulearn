package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.entities.Category;
import com.uol.finalproject.edulearn.repositories.CategoryRepository;
import com.uol.finalproject.edulearn.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {


    private final CategoryRepository categoryRepository;


    @Override
    public Page<Category> getCategories(PageRequest pageRequest) {
        return categoryRepository.findAll(pageRequest);
    }


    public CategoryRepository getRepository() {
        return categoryRepository;
    }
}
