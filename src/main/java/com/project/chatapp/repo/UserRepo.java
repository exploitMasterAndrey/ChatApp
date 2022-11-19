package com.project.chatapp.repo;

import com.project.chatapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String name);
    Optional<User> findUserByEmail(String email);

    @Query("SELECT u FROM User u where u.userName like %:name%")
    List<User> findAllUsersFromInput(@Param("name") String name);

    User findUserById(Long id);
}
