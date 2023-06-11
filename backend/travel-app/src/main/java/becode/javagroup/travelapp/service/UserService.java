package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.exception.DuplicateUserException;
import becode.javagroup.travelapp.exception.UserNotFoundException;
import becode.javagroup.travelapp.model.Role;
import becode.javagroup.travelapp.model.RoleName;
import becode.javagroup.travelapp.model.User;
import becode.javagroup.travelapp.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service class for handling user related operations.
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    /**
     * Creates a new user.
     *
     * @param username The username of the user.
     * @param password The password of the user.
     * @param email The email of the user.
     * @return An Optional<User> that contains the created user.
     * @throws DuplicateUserException if a user with the provided username or email already exists.
     */
    @Transactional
    public Optional<User> createUser(String username, String password, String email) {
        if (isUsernameOrEmailTaken(username, email)) {
            throw new DuplicateUserException("Error: Username or email already in use.");
        }

        String hashedPassword = hashPassword(password);

        User user = buildNewUser(username, email, hashedPassword);

        userRepository.save(user);
        logger.info("User created with ID: {}", user.getId());

        return Optional.of(user);
    }

    /**
     * Checks if the given password is correct for the provided user.
     *
     * @param user The user to check the password for.
     * @param password The password to check.
     * @return true if the password is correct, false otherwise.
     */
    public boolean checkPassword(@NotNull User user, String password) {
        return BCrypt.checkpw(password, user.getPasswordHash());
    }

    /**
     * Updates the details of an existing user.
     *
     * @param updatedUser The user with the updated details.
     * @return An Optional<User> that contains the updated user.
     * @throws UserNotFoundException if a user with the provided id does not exist.
     */
    @Transactional
    public Optional<User> updateUser(@NotNull User updatedUser) {
        User user = findUserById(updatedUser.getId());

        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());

        if (isPasswordChanged(updatedUser, user)) {
            user.setPasswordHash(hashPassword(updatedUser.getPasswordHash()));
        }

        userRepository.save(user);
        logger.info("User updated with ID: {}", user.getId());

        return Optional.of(user);
    }

    /**
     * Deletes a user.
     *
     * @param id The id of the user to be deleted.
     * @return An Optional<Void>.
     * @throws UserNotFoundException if a user with the provided id does not exist.
     */
    @Transactional
    public Optional<Void> deleteUser(Long id) {
        User user = findUserById(id);

        userRepository.delete(user);
        logger.info("User deleted with ID: {}", user.getId());

        return Optional.empty();
    }

    /**
     * Assigns a role to a user.
     *
     * @param userId The id of the user.
     * @param roleName The name of the role to be assigned.
     * @return An Optional<User> that contains the user with the newly assigned role.
     * @throws UserNotFoundException if a user with the provided id does not exist.
     */
    @Transactional
    public Optional<User> assignRoleToUser(Long userId, RoleName roleName) {
        User user = findUserById(userId);
        Role role = roleService.findByName(roleName);

        user.getRoles().add(role);

        userRepository.save(user);
        logger.info("Role {} assigned to user with ID: {}", roleName, user.getId());

        return Optional.of(user);
    }

    /**
     * Removes a role from a user.
     *
     * @param userId The id of the user.
     * @param roleName The name of the role to be removed.
     * @return An Optional<User> that contains the user with the role removed.
     * @throws UserNotFoundException if a user with the provided id does not exist.
     * @throws IllegalArgumentException if the user does not have the role to be removed.
     */
    @Transactional
    public Optional<User> removeRoleFromUser(Long userId, RoleName roleName) {
        User user = findUserById(userId);
        Role role = roleService.findByName(roleName);

        if (user.getRoles().contains(role)) {
            user.getRoles().remove(role);
            userRepository.save(user);
            logger.info("Role {} removed from user with ID: {}", roleName, user.getId());

            return Optional.of(user);
        } else {
            throw new IllegalArgumentException("Error: User does not have this role.");
        }
    }


    // Private helper methods
    private boolean isUsernameOrEmailTaken(String username, String email) {
        return userRepository.findByUsername(username).isPresent() || userRepository.findByEmail(email).isPresent();
    }

    private @NotNull String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    private User buildNewUser(String username, String email, String hashedPassword) {
        return User.builder()
                .username(username)
                .email(email)
                .passwordHash(hashedPassword)
                .build();
    }

    private User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Error: User not found."));
    }

    private boolean isPasswordChanged(@NotNull User updatedUser, @NotNull User user) {
        return !updatedUser.getPasswordHash().equals(user.getPasswordHash());
    }
}