package com.uol.finalproject.edulearn.integration.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uol.finalproject.edulearn.BaseIntegrationTest;
import com.uol.finalproject.edulearn.advice.CustomExceptionHandler;
import com.uol.finalproject.edulearn.advice.GlobalControllerAdvice;
import com.uol.finalproject.edulearn.controllers.CategoryController;
import com.uol.finalproject.edulearn.entities.Category;
import com.uol.finalproject.edulearn.repositories.CategoryRepository;
import com.uol.finalproject.edulearn.services.CategoryService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CategoryControllerTest extends BaseIntegrationTest {


    @Autowired
    private CategoryController categoryController;

    @SpyBean
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        categoryController = new CategoryController(categoryService);
        mockMvc = MockMvcBuilders.standaloneSetup(categoryController)
                .setCustomArgumentResolvers(new PageableHandlerMethodArgumentResolver())
                .setControllerAdvice(new CustomExceptionHandler(), new GlobalControllerAdvice())
                .build();
    }

    @Test
    public void testShouldSuccessfullyRetrieveCategories() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/categories")
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty());

        verify(categoryService, times(1)).getCategories(any(PageRequest.class));
    }

    @Test
    public void testShouldSuccessfullyCreateCategories() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/categories")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(new ObjectMapper().writeValueAsString(Category.builder()
                                        .name("Test Category Name")
                                .build()))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty());

        verify(categoryService, times(1)).createCategory(any(Category.class));
    }


    @Test
    public void testShouldUpdateCategoriesShouldReturnSuccess() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.put("/api/categories")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(new ObjectMapper().writeValueAsString(Category.builder()
                                .name("Updated Category Name")
                                .build()))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty());

        verify(categoryService, times(1)).updateCategory(any(Category.class));
    }

    @Test
    public void testShouldUpdateCategoriesForNonexistentCategoryShouldReturnError() throws Exception {
        getOrCreateCategory("Updated Category Name");
        Category categoryToUpdate = Category.builder()
                .name("Updated Category Name")
                .build();
        categoryToUpdate.setId(3000l);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/categories")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(new ObjectMapper().writeValueAsString(categoryToUpdate))
                )
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").isNotEmpty());

        verify(categoryService, times(1)).updateCategory(any(Category.class));
    }

    @Test
    public void testShouldDeleteCategoryShouldReturnSuccessForValidCategory() throws Exception {
        Category category = getOrCreateCategory("Test Category Name");
        mockMvc.perform(MockMvcRequestBuilders.delete(String.format("/api/categories/%s", category.getId()))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(new ObjectMapper().writeValueAsString(Category.builder()
                                .name("Updated Category Name")
                                .build()))
                )
                .andDo(print())
                .andExpect(status().isOk());

        verify(categoryService, times(1)).deleteCategory(any(Long.class));
    }

    @Test
    public void testShouldDeleteCategoryShouldReturnNotFoundForInvalidCategory() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/categories/1000000")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(new ObjectMapper().writeValueAsString(Category.builder()
                                .name("Updated Category Name")
                                .build()))
                )
                .andDo(print())
                .andExpect(status().isNotFound());

        verify(categoryService, times(1)).deleteCategory(any(Long.class));
    }



    private Category getOrCreateCategory(String name) {
        return categoryRepository.findFirstByName(name).orElseGet(() -> categoryService.createCategory(
                Category.builder().name(name).build()));

    }
}
