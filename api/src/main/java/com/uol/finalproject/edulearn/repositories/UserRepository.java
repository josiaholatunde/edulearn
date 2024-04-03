package com.uol.finalproject.edulearn.repositories;

import com.uol.finalproject.edulearn.entities.User;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

   Optional<User> findByUsername(String name);

   boolean existsByUsernameAndRoleType(String name, RoleType roleType);
   boolean existsByUsername(String name);
}
