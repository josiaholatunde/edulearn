package com.uol.finalproject.edulearn.specifications;

import com.uol.finalproject.edulearn.apimodel.specifications.UserSpecificationSearchCriteria;
import com.uol.finalproject.edulearn.entities.StudentUser;
import com.uol.finalproject.edulearn.entities.User;
import jakarta.persistence.criteria.Predicate;
import org.apache.logging.log4j.util.Strings;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class StudentUserSpecification {


    public static Specification<StudentUser> buildSearchPredicate(UserSpecificationSearchCriteria specificationSearchCriteria) {
        return (root, query, builder) -> {
            final List<Predicate> allSearchPredicates = new ArrayList<>();

            if (Strings.isNotBlank(specificationSearchCriteria.getName())) {
                Predicate firstNamePredicate = builder.equal(builder.lower(root.get("firstName")), specificationSearchCriteria.getName().toLowerCase());
                Predicate lastNamePredicate = builder.equal(builder.lower(root.get("lastName")), specificationSearchCriteria.getName().toLowerCase());
                allSearchPredicates.add(builder.or(firstNamePredicate, lastNamePredicate));
            }

            if (specificationSearchCriteria.getLevel() != null) {
                allSearchPredicates.add(builder.equal(root.get("level"), specificationSearchCriteria.getLevel()));
            }

            Predicate[] predicates = allSearchPredicates.toArray(new Predicate[0]);

            Predicate combinedPredicate = builder.and(predicates);
            query.orderBy(builder.asc(root.get("level")));
            return combinedPredicate;
        };
    }
}
