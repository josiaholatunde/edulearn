package com.uol.finalproject.edulearn.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.uol.finalproject.edulearn.listeners.AuditingEntityListener;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.sql.Timestamp;

@MappedSuperclass
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Data
@EntityListeners(AuditingEntityListener.class)
public class BaseAuditableModel {

    @Id
    @GeneratedValue
    private Long id;

    @CreatedDate
    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;
}
