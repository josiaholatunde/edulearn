package com.uol.finalproject.edulearn.specifications;

import com.uol.finalproject.edulearn.apimodel.specifications.ChallengeSpecificationSearchCriteria;
import com.uol.finalproject.edulearn.apimodel.specifications.UserSpecificationSearchCriteria;
import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.StudentUser;
import jakarta.persistence.criteria.Predicate;
import org.apache.logging.log4j.util.Strings;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ChallengeSpecification {


    public static Specification<Challenge> buildSearchPredicate(ChallengeSpecificationSearchCriteria specificationSearchCriteria) {
        return (root, query, builder) -> {
            final List<Predicate> allSearchPredicates = new ArrayList<>();

            if (Strings.isNotBlank(specificationSearchCriteria.getTitle())) {
                Predicate titlePredicate = builder.equal(builder.lower(root.get("title")), specificationSearchCriteria.getTitle().toLowerCase());
                allSearchPredicates.add(titlePredicate);
            }

            if (specificationSearchCriteria.getCategory() != null) {
                allSearchPredicates.add(builder.like(root.get("category"), "%" + specificationSearchCriteria.getCategory() + "%"));
            }

            if (specificationSearchCriteria.getCreatedBy() != null) {
                allSearchPredicates.add(builder.equal(root.get("createdBy"), specificationSearchCriteria.getCreatedBy()));
            }

            Predicate[] predicates = allSearchPredicates.toArray(new Predicate[0]);

            Predicate combinedPredicate = builder.and(predicates);
            query.orderBy(builder.asc(root.get("updatedAt")));
            return combinedPredicate;
        };
    }
}
