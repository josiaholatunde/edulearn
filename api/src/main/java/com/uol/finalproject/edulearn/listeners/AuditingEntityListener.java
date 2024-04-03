package com.uol.finalproject.edulearn.listeners;

import com.uol.finalproject.edulearn.entities.BaseAuditableModel;
import com.uol.finalproject.edulearn.util.DateUtil;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import org.springframework.stereotype.Component;

@Component
public class AuditingEntityListener {
    @PrePersist
    public void beforeCreation(BaseAuditableModel baseAuditableModel) {
        baseAuditableModel.setCreatedAt(DateUtil.getCurrentDate());
        baseAuditableModel.setUpdatedAt(DateUtil.getCurrentDate());
    }

    @PreUpdate
    public void beforeUpdate(BaseAuditableModel baseAuditableModel) {
        baseAuditableModel.setUpdatedAt(DateUtil.getCurrentDate());
    }
}