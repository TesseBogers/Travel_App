package becode.javagroup.travelapp.repository;

import becode.javagroup.travelapp.model.Role;
import becode.javagroup.travelapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE :roles MEMBER OF u.roles")
    List<User> findByRoles(@Param("roles") Set<Role> roles);

}