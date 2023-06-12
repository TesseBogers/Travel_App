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

/**
 * UserRepository is a repository interface that extends JpaRepository.
 * The JpaRepository interface provides methods for performing CRUD operations on the User entity.
 * The methods in this interface are implemented by Spring Data JPA, allowing us to use them without having to write any code.
 * The @Repository annotation is used to indicate that this interface is a repository.
 * @see JpaRepository
 * @see <a href="https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation">Query Creation</a>
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Finds a user by its username.
     * @param username the username of the user.
     * @return the User object.
     */
    Optional<User> findByUsername(String username);

    /**
     * Finds a user by its email.
     * @param email the email of the user.
     * @return the User object.
     */
    Optional<User> findByEmail(String email);


    /**
     * Finds users by their roles.
     *
     * @param roles The roles to search for.
     * @return A list of users having the specified roles.
     * @see Role
     * @see User
     */
    @Query("SELECT u FROM User u WHERE :roles MEMBER OF u.roles")
    List<User> findByRoles(@Param("roles") Set<Role> roles);
}