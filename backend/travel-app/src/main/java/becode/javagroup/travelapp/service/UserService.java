package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.exception.DuplicateUserException;
import becode.javagroup.travelapp.exception.UserNotFoundException;
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
 */
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    /**
     * The UserRepository is used to store and retrieve user data.
     * The logger is used to log information, warnings, and errors.
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
     * @throws DuplicateUserException if a user with the given username or email already exists.
     */
    public User createUser(String username, String password, String email, Set<RoleName> roles) {
        validateUsernameAndEmail(null, username, email);

        String hashedPassword = hashPassword(password);
        User user = buildNewUser(username, email, hashedPassword);
        Set<Role> roleSet = convertToRoleSet(roles);
        user.setRoles(roleSet);
        userRepository.save(user);
        logger.info("User created with ID: {}", user.getId());

        return user;
    }

    /**
     * Checks if the given password matches the user's password.
     *
     * @param user     The user.
     * @param password The password to check.
     * @return True if the passwords match, false otherwise.
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
     */
    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("No user found with id = " + id));
    }

    /**
     * Finds a user by its username.
     *
     * @param username The username of the user.
     * @return An Optional containing the user if found, or an empty Optional otherwise.
     */
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * Finds a user by its email.
     *
     * @param email The email of the user.
     * @return An Optional containing the user if found, or an empty Optional otherwise.
     */
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Finds all users with any of the given roles.
     *
     * @param roles The set of roles.
     * @return A list of users with any of the roles.
     */
    public List<User> findAllUsersByRoles(Set<RoleName> roles) {
        // Convert Set<RoleName> to Set<Role>
        Set<Role> roleSet = roles.stream()
                .map(roleRepository::findByRoleName)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
        // Find all users with the specified roles
        return userRepository.findByRoles(roleSet);
    }

    /**
     * Find user by email
     *
     * @param email user email
     * @return user
     */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("No user found with email = " + email));
    }

    /**
     * Find user by username
     *
     * @param username user username
     * @return user
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
     */
    private void validateUsernameAndEmail(Long id, String username, String email) {
        Optional<User> existingUserWithUsername = userRepository.findByUsername(username);
        Optional<User> existingUserWithEmail = userRepository.findByEmail(email);

        if (existingUserWithUsername.isPresent() && !existingUserWithUsername.get().getId().equals(id)) {
            throw new DuplicateUserException("Username is already in use: " + username);
        }
        if (existingUserWithEmail.isPresent() && !existingUserWithEmail.get().getId().equals(id)) {
            throw new DuplicateUserException("Email is already in use: " + email);
        }
    }

    /**
     * Hashes the given password.
     *
     * @param plainPassword The password to hash.
     * @return The hashed password.
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
    private Set<Role> convertToRoleSet(Set<RoleName> roles) {
        Set<Role> roleSet = new HashSet<>();
        for (RoleName roleName : roles) {
            Role role = new Role();
            role.setName(String.valueOf(roleName));
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
    private User buildNewUser(String username, String email, String hashedPassword) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPasswordHash(hashedPassword);

        return user;
    }
}