package becode.javagroup.travelapp.repository;

import becode.javagroup.travelapp.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Repository interface for User entities.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find User entity by username.
     *
     * @param username The username to search for.
     * @return The User entity.
     */
    @Query("SELECT u FROM User u JOIN FETCH u.roles r JOIN FETCH r.permissions WHERE u.username = (:username)")
    Optional<User> findByUsername(@Param("username") String username);

    /**
     * Find User entity by email.
     *
     * @param email The email to search for.
     * @return The User entity.
     */
    Optional<User> findByEmail(String email);

    /**
     * Find all User entities with certain roles.
     *
     * @param roles The roles to search for.
     * @return The list of User entities.
     */
    List<User> findByRolesIn(Collection<Role> roles);

    /**
     * Find all User entities with a certain role.
     *
     * @param roleName The role to search for.
     * @return The list of User entities.
     */
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.roleName = :roleName")
    List<User> findByRole(@Param("roleName") RoleName roleName);

    /**
     * Find all User entities with a certain role that are currently traveling.
     *
     * @param roleName The role to search for.
     * @return The list of User entities.
     */
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.roleName = :roleName")
    List<User> findUsersTraveling(@Param("roleName") RoleName roleName);

    /**
     * Find all User entities with a certain role.
     *
     * @param roleName The role to search for.
     * @return The list of User entities.
     */
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.roleName = :roleName")
    List<User> findUsersWithRole(@Param("roleName") RoleName roleName);

    /**
     * Find all User entities with a certain permission.
     *
     * @param permissionName The permission to search for.
     * @return The list of User entities.
     */
    @Query("SELECT u FROM User u JOIN u.roles r JOIN r.permissions p WHERE p.permissionName = :permissionName")
    List<User> findUsersWithPermission(@Param("permissionName") String permissionName);

    /**
     * Find all roles for a specific user.
     *
     * @param userId The user ID to search for.
     * @return The set of roles for the user.
     */
    @Query("SELECT r FROM User u JOIN u.roles r WHERE u.id = :userId")
    Set<Role> getRolesForUser(@Param("userId") Long userId);

    /**
     * Find all permissions for a specific user.
     *
     * @param userId The user ID to search for.
     * @return The set of permissions for the user.
     */
    @Query("SELECT p FROM User u JOIN u.roles r JOIN r.permissions p WHERE u.id = :userId")
    Set<Permission> getPermissionsForUser(@Param("userId") Long userId);
}
