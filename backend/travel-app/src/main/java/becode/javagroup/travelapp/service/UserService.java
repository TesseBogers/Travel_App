package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.exception.DuplicateUserException;
import becode.javagroup.travelapp.exception.UserNotFoundException;
import becode.javagroup.travelapp.model.Permission;
import becode.javagroup.travelapp.model.Role;
import becode.javagroup.travelapp.model.RoleName;
import becode.javagroup.travelapp.model.User;
import becode.javagroup.travelapp.repository.RoleRepository;
import becode.javagroup.travelapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * UserService is a service class responsible for managing users in the system.
 * It interacts with the UserRepository to store and retrieve user data.
 * The service annotation is used to mark this class as a service. Service classes are used to separate the business logic from the controller.
 * Transactional is used to ensure that all operations in this class are executed in a single transaction.
 * RequiredArgsConstructor is used to create a constructor for this class that takes all final fields as arguments.
 * @see Service
 * @see <a href="https://www.baeldung.com/spring-transactional-propagation-isolation">Transactional</a>
 * @see <a href="https://projectlombok.org/features/constructor">RequiredArgsConstructor</a>
 *
 */
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    /**
     * The UserRepository is used to store and retrieve user data.
     * The roleRepository is used to store and retrieve role data.
     * The logger is used to log information, warnings, and errors.
     * @see UserRepository
     * @see RoleRepository
     * @see Logger
     */
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    /**
     * Creates a user with the provided details.
     *
     * @param username the username of the user.
     * @param password the password of the user.
     * @param email    the email of the user.
     * @param roles    the roles of the user.
     * @return The created user.
     */
    public User createUser(String username, String password, String email, Set<RoleName> roles) {
        validateUsernameAndEmail(null, username, email);

        String hashedPassword = hashPassword(password);
        User user = buildNewUser(username, email, hashedPassword);
        Set<Role> roleSet = fetchRoles(roles);
        user.setRoles(roleSet);
        userRepository.save(user);
        logger.info("User created with ID: {}", user.getId());

        return user;
    }

    /**
     * Fetches roles from the database.
     *
     * @param roles The set of RoleName.
     * @return The set of Role.
     */
    private @NotNull Set<Role> fetchRoles(@NotNull Set<RoleName> roles) {
        return roles.stream()
                .map(roleRepository::findByRoleName)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
    }

    /**
     * Checks if the given password matches the user's password.
     *
     * @param user     The user.
     * @param password The password to check.
     * @return True if the passwords match, false otherwise.
     * BCrypt is used to hash the password.
     * @see <a href="https://www.baeldung.com/java-password-hashing">Hashing Passwords</a>
     * @see <a href="https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/crypto/bcrypt/BCrypt.html">BCrypt</a>
     */
    public boolean checkPassword(@NotNull User user, String password) {
        return BCrypt.checkpw(password, user.getPasswordHash());
    }

    /**
     * Updates the user with the given details.
     *
     * @param id       the id of the user.
     * @param username the new username of the user.
     * @param password the new password of the user.
     * @param email    the new email of the user.
     * @param roles    the new roles of the user.
     * @return The updated user.
     */
    public User updateUser(Long id, String username, String password, String email, Set<RoleName> roles) {
        validateUsernameAndEmail(id, username, email);

        User user = findUserById(id);
        user.setUsername(username);
        user.setEmail(email);
        String newHashedPassword = hashPassword(password);
        user.setPasswordHash(newHashedPassword);
        Set<Role> roleSet = convertToRoleSet(roles);
        user.setRoles(roleSet);
        userRepository.save(user);
        logger.info("User updated with ID: {}", user.getId());

        return user;
    }

    /**
     * Deletes the user with the given id.
     *
     * @param id the id of the user to delete.
     */
    public void deleteUser(Long id) {
        User user = findUserById(id);
        userRepository.delete(user);
        logger.info("User deleted with ID: {}", user.getId());
    }

    /**
     * Finds a user by its ID.
     *
     * @param id The ID of the user.
     * @return The user, or throws UserNotFoundException if the user doesn't exist.
     * @throws UserNotFoundException  {@inheritDoc}
     */
    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("No user found with id = " + id));
    }

    /**
     * Finds a user by its username.
     *
     * @param username The username of the user.
     * @return An User instance or throws an exception if not found.
     * @throws UserNotFoundException if the user doesn't exist.
     */
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("No user found with username = " + username));
    }

    /**
     * Finds a user by its email.
     *
     * @param email The email of the user.
     * @return An User instance or throws an exception if not found.
     * @throws UserNotFoundException if the user doesn't exist.
     */
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("No user found with email = " + email));
    }

    /**
     * Finds all users with any of the given roles.
     *
     * @param roles The set of roles.
     * @return A list of users with any of the roles.
     * @see RoleName
     * @see Role
     *
     */
    public List<User> findAllUsersByRoles(@NotNull Set<RoleName> roles) {
        // Convert Set<RoleName> to Set<Role>
        Set<Role> roleSet = roles.stream()
                .map(roleRepository::findByRoleName)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
        // Find all users with the specified roles
        return userRepository.findByRolesIn(roleSet);
    }


    /**
     * Find user by email
     *
     * @param email user email
     * @return user
     * @throws UserNotFoundException {@inheritDoc}
     */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("No user found with email = " + email));
    }

    /**
     * Find user by username
     *
     * @param username user username
     * @return user
     * @throws UserNotFoundException {@inheritDoc}
     */
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException("No user found with username = " + username));
    }

    /**
     * Returns all the users.
     *
     * @return A list of all users.
     */
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    // Private methods...
    /**
     * Validates the given username and email. If a user with the given id exists, it also checks if the username
     * and email are the same as the existing ones.
     *
     * @param id       The id of the existing user.
     * @param username The username to check.
     * @param email    The email to check.
     * @throws DuplicateUserException If a user with the given username or email already exists.
     * @throws DuplicateUserException {@inheritDoc}
     * @see <a href="https://www.baeldung.com/java-optional">Optional</a>
     */
    private void validateUsernameAndEmail(Long id, String username, String email) {
        userRepository.findByUsername(username).ifPresent(user -> {
            if (id == null || !id.equals(user.getId())) {
                throw new DuplicateUserException("Username is already in use: " + username);
            }
        });

        userRepository.findByEmail(email).ifPresent(user -> {
            if (id == null || !id.equals(user.getId())) {
                throw new DuplicateUserException("Email is already in use: " + email);
            }
        });
    }

    /**
     * Hashes the given password.
     *
     * @param plainPassword The password to hash.
     * @return The hashed password.
     * @see <a href="https://www.baeldung.com/java-password-hashing">Hashing Passwords</a>
     * @see <a href="https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/crypto/bcrypt/BCrypt.html">BCrypt</a>
     *
     */
    private @NotNull String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }

    /**
     * Converts a set of RoleName to a set of Role.
     *
     * @param roles The set of RoleName.
     * @return The set of Role.
     */
    private @NotNull Set<Role> convertToRoleSet(@NotNull Set<RoleName> roles) {
        logger.info("Converting roles to Role set...");
        Set<Role> roleSet = new HashSet<>();
        for (RoleName roleName : roles) {
            logger.info("Converting role: {}", roleName);
            Role role = new Role();
            logger.info("Setting role name: {}", roleName);
            role.setName(String.valueOf(roleName));
            logger.info("Adding role to set: {}", role);
            roleSet.add(role);
        }

        return roleSet;
    }

    /**
     * Builds a new User object.
     *
     * @param username       The username of the user.
     * @param email          The email of the user.
     * @param hashedPassword The hashed password of the user.
     * @return A new User object.
     */
    private @NotNull User buildNewUser(String username, String email, String hashedPassword) {
        logger.info("Building new user...");
        User user = new User();
        logger.info("Setting username: {}", username);
        user.setUsername(username);
        logger.info("Setting email: {}", email);
        user.setEmail(email);
        user.setPasswordHash(hashedPassword);

        return user;
    }

    /**
     * Find users who are traveling.
     *
     * @return List of users with the role ROLE_TRAVELER.
     */
    public List<User> findUsersTraveling() {
        logger.info("Finding users traveling...");
        return userRepository.findUsersTraveling(RoleName.ROLE_TRAVELER);
    }

    /**
     * Find users with the given role.
     *
     * @param roleName The name of the role to filter users by.
     * @return List of users with the specified role.
     */
    public List<User> findUsersWithRole(RoleName roleName) {
        logger.info("Finding users with role: {}", roleName);
        return userRepository.findUsersWithRole(roleName);
    }

    /**
     * Find users with the given permission.
     *
     * @param permissionName The name of the permission to filter users by.
     * @return List of users with the specified permission.
     */
    public List<User> findUsersWithPermission(String permissionName) {
        logger.info("Finding users with permission: {}", permissionName);
        return userRepository.findUsersWithPermission(permissionName);
    }

    /**
     * Retrieve all roles for the given user.
     *
     * @param id The ID of the user.
     * @return Set of roles assigned to the user.
     */
    public Set<Role> getRolesForUser(Long id) {
        logger.info("Getting roles for user with id: {}", id);
        return userRepository.getRolesForUser(id);
    }

    /**
     * Retrieve all permissions for the given user.
     *
     * @param id The ID of the user.
     * @return Set of permissions assigned to the user.
     */
    public Set<Permission> getPermissionsForUser(Long id) {
        logger.info("Getting permissions for user with id: {}", id);
        return userRepository.getPermissionsForUser(id);
    }
}