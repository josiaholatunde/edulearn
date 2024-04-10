package com.uol.finalproject.edulearn.apimodel.specifications;


import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeSpecificationSearchCriteria {

    private String category;
    private String title;

    private RoleType createdBy;

    private StudentUser studentUser;

    @Builder.Default
    private int page = 0;

    @Builder.Default
    private int size = 10;
}
