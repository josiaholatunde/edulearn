package com.uol.finalproject.edulearn.apimodel.specifications;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSpecificationSearchCriteria {

    private Integer level;
    private String name;

    @Builder.Default
    private int page = 0;

    @Builder.Default
    private int size = 10;
}
