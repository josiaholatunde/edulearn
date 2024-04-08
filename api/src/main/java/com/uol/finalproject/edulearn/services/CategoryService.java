package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.entities.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface CategoryService {


    Page<Category> getCategories(PageRequest pageRequest);

    Category createCategory(Category category);

    Category updateCategory(Category category);

    void deleteCategory(long categoryId);
}
