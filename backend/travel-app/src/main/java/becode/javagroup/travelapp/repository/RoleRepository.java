package becode.javagroup.travelapp.repository;

import becode.javagroup.travelapp.model.Role;
import becode.javagroup.travelapp.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * RoleRepository is a repository interface that extends JpaRepository.
 * The JpaRepository interface provides methods for performing CRUD operations on the Role entity.
 * The methods in this interface are implemented by Spring Data JPA, allowing us to use them without having to write any code.
 * The @Repository annotation is used to indicate that this interface is a repository.
 * @see JpaRepository
 * @see <a href="https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation">Query Creation</a>
 */
public interface RoleRepository extends JpaRepository<Role, Long> {
    /**
     * Finds a role by its name.
     * @param name the name of the role.
     * @return the Role object.
     */
    Optional<Role> findByName(String name);

    /**
     * Finds a role by its role name.
     * @param roleName the role name of the role.
     * @return the Role object.
     */
    Optional<Role> findByRoleName(RoleName roleName);
}