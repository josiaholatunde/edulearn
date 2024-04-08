package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.entities.Category;
import com.uol.finalproject.edulearn.exceptions.BadRequestException;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.CategoryRepository;
import com.uol.finalproject.edulearn.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {


    private final CategoryRepository categoryRepository;


    @Override
    public Page<Category> getCategories(PageRequest pageRequest) {
        return getRepository().findAll(pageRequest);
    }

    @Override
    public Category createCategory(Category category) {
        if (getRepository().existsByName(category.getName())) throw new ResourceNotFoundException("Category name has been taken");
        return getRepository().save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        Optional<Category> categoryFromDbOptional = getRepository().findFirstByName(category.getName());
        if (categoryFromDbOptional.isPresent()) {
            if (categoryFromDbOptional.get().getId() != category.getId()) throw new BadRequestException("Category name has been taken");
        }
        return getRepository().save(category);
    }

    @Override
    public void deleteCategory(long categoryId) {
        Category category = getRepository().findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category was not found"));

        getRepository().delete(category);
    }


    public CategoryRepository getRepository() {
        return categoryRepository;
    }
}
