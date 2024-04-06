package com.uol.finalproject.edulearn.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Table(name = "categories")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category extends BaseAuditableModel {

    private String name;

}
