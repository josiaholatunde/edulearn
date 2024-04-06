package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
