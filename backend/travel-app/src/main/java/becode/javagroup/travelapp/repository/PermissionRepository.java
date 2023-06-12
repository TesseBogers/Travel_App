package becode.javagroup.travelapp.repository;

import becode.javagroup.travelapp.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * PermissionRepository is a repository interface that extends JpaRepository.
 * The JpaRepository interface provides methods for performing CRUD operations on the Permission entity.
 * The methods in this interface are implemented by Spring Data JPA, allowing us to use them without having to write any code.
 * The @Repository annotation is used to indicate that this interface is a repository.
 * @see JpaRepository
 * @see <a href="https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation">Query Creation</a>
 */
public interface PermissionRepository extends JpaRepository<Permission, Long> {
    /**
     * Finds a permission by its name.
     * @param name the name of the permission.
     * @return the Permission object.
     */
    Optional<Permission> findByName(String name);
}