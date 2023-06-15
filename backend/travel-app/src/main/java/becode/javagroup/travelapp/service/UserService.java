package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.dto.UserDto;
import becode.javagroup.travelapp.dto.UserResponseDto;
import becode.javagroup.travelapp.dto.UserProfileDto;
import becode.javagroup.travelapp.exception.DuplicateUserException;
import becode.javagroup.travelapp.exception.PermissionNotFoundException;
import becode.javagroup.travelapp.exception.UserNotFoundException;
import becode.javagroup.travelapp.exception.UserProfileNotFoundException;
import becode.javagroup.travelapp.mapper.UserProfileMapper;
import becode.javagroup.travelapp.model.*;
import becode.javagroup.travelapp.repository.PermissionRepository;
import becode.javagroup.travelapp.repository.RoleRepository;
import becode.javagroup.travelapp.repository.UserProfileRepository;
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
    private final UserProfileMapper userProfileMapper;
    private final PermissionRepository permissionRepository;
    private final UserProfileRepository userProfileRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    /**
     * Creates a user with the provided details.
     *
     * @param userDto The user details.
     * @return The created user.
     */
    @Transactional
    public UserResponseDto createUser(UserDto userDto) {
        logger.info("Creating a new user with username: {}, email: {}, and roles: {}",
                userDto.getUsername(),
                userDto.getEmail(),
                userDto.getRoles());

        try {
            validateUsernameAndEmail(userDto.getUsername(), userDto.getEmail());

            String salt = BCrypt.gensalt();
            String hashedPassword = hashPassword(userDto.getPassword(), salt);
            User user = buildNewUser(userDto, hashedPassword, salt);

            logger.info("Fetching and saving roles...");
            Set<Role> roleSet = fetchRoles(userDto.getRoles());
            roleSet = saveRoles(roleSet);
            assignRolesToUser(user, roleSet);
            logger.info("Roles fetched and saved.");

            mapUserProfile(user, userDto.getUserProfile());

            User savedUser = userRepository.save(user);
            logger.info("User created with ID: {}", savedUser.getId());

            return new UserResponseDto(savedUser);
        } catch (Exception exception) {
            logger.error("Error creating user: {}", exception.getMessage(), exception);
            throw exception;
        }
    }

    private Set<Role> saveRoles(Set<Role> roles) {
        return new HashSet<>(roleRepository.saveAll(roles));
    }

    private void assignRolesToUser(User user, Set<Role> roles) {
        user.setRoles(roles);
    }


    private void mapUserProfile(User user, UserProfileDto userProfileDto) {
        UserProfile userProfile = userProfileMapper.dtoToUserProfile(userProfileDto);
        userProfile.setUser(user);
        user.setUserProfile(userProfile);
        userProfileRepository.save(userProfile);
    }

    /**
     * Fetches roles from the database.
     *
     * @param roleNames The set of RoleName.
     * @return The set of Role.
     */
    public Set<Role> fetchRoles(Set<String> roleNames) {
        Set<Role> roles = new HashSet<>();

        for (String roleName : roleNames) {
            Optional<Role> optionalRole = roleRepository.findByRoleName(roleName);
            if (optionalRole.isPresent()) {
                Role role = optionalRole.get();
                role.getPermissions().clear(); // clear existing permissions

                switch (roleName) {
                    case "ROLE_USER" -> assignUserPermissions(role);
                    case "ROLE_ADMIN" -> assignAdminPermissions(role);
                    case "ROLE_MODERATOR" -> assignModeratorPermissions(role);
                    case "ROLE_TRAVELER" -> assignTravelerPermissions(role);
                    default -> throw new IllegalArgumentException("Invalid role: " + roleName);
                }

                roles.add(role);
            } else {
                Role newRole = new Role();
                newRole.setRoleName(roleName);
                roles.add(newRole);
            }
        }
        return roles;
    }

    private void assignUserPermissions(Role role) {
        role.getPermissions().add(getPermissionByName(PermissionName.PERMISSION_READ.getValue()));
        role.getPermissions().add(getPermissionByName(PermissionName.PERMISSION_UPDATE.getValue()));
    }

    private void assignAdminPermissions(Role role) {
        role.getPermissions().add(getPermissionByName(PermissionName.PERMISSION_ALL.getValue()));
    }

    private void assignModeratorPermissions(Role role) {
        role.getPermissions().add(getPermissionByName(PermissionName.PERMISSION_READ.getValue()));
        role.getPermissions().add(getPermissionByName(PermissionName.PERMISSION_UPDATE.getValue()));
        role.getPermissions().add(getPermissionByName(PermissionName.PERMISSION_DELETE.getValue()));
    }

    private void assignTravelerPermissions(Role role) {
        role.getPermissions().add(getPermissionByName(PermissionName.PERMISSION_CREATE.getValue()));
        role.getPermissions().add(getPermissionByName(PermissionName.PERMISSION_READ.getValue()));
        role.getPermissions().add(getPermissionByName(PermissionName.PERMISSION_UPDATE.getValue()));
    }

    private Permission getPermissionByName(String permissionName) {
        return permissionRepository.findByPermissionName(permissionName)
                .orElseThrow(() -> new PermissionNotFoundException("Permission not found: " + permissionName));
    }

    /**
     * Checks if the given password matches the user's password.
     *
     * @param user     The user.
     * @param passwordToCheck The password to check.
     * @return True if the passwords match, false otherwise.
     * BCrypt is used to hash the password.
     * @see <a href="https://www.baeldung.com/java-password-hashing">Hashing Passwords</a>
     * @see <a href="https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/crypto/bcrypt/BCrypt.html">BCrypt</a>
     */
    public boolean checkPassword(User user, String passwordToCheck) {
        return BCrypt.checkpw(passwordToCheck, user.getPasswordHash());
    }


    /**
     * Updates the user with the given details.
     *
     * @param userDto The user details.
     * @return The updated user.
     */
    @Transactional
    public User updateUser(Long id, UserDto userDto) {
        User existingUser = findUserById(id);
        validateUsernameAndEmail(id, userDto.getUsername(), userDto.getEmail());

        existingUser.setUsername(userDto.getUsername());
        existingUser.setEmail(userDto.getEmail());

        if(userDto.getPassword() != null && !userDto.getPassword().isEmpty()){
            String salt = BCrypt.gensalt(); // Create a new unique salt
            existingUser.setSalt(salt); // Store the salt with the user
            existingUser.setPasswordHash(hashPassword(userDto.getPassword(), salt));
        }

        Set<Role> roleSet = fetchRoles(userDto.getRoles());
        existingUser.setRoles(roleSet);

        mapUserProfile(existingUser, userDto.getUserProfile());

        userRepository.save(existingUser);

        logger.info("User updated with ID: {}", existingUser.getId());

        return existingUser;
    }


    private String hashPassword(String password, String salt) {
        return BCrypt.hashpw(password, salt); // Use the salt when hashing
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
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("No user found with id = " + id));

        UserProfile userProfile = user.getUserProfile();
        if (userProfile == null) {
            throw new UserProfileNotFoundException("No UserProfile found for user with id = " + id);
        }
        return user;
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
    public List<User> findAllUsersByRoles(@NotNull Set<String> roles) {
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
        return userRepository.findByEmail(email).orElseThrow(() -> new DuplicateUserException("Email is already in use: " + email));
    }

    /**
     * Find user by username
     *
     * @param username user username
     * @return user
     * @throws UserNotFoundException {@inheritDoc}
     */
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new DuplicateUserException("Username is already in use: " + username));
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
            if (!id.equals(user.getId())) {
                throw new DuplicateUserException("Username is already in use: " + username);
            }
        });

        userRepository.findByEmail(email).ifPresent(user -> {
            if (!id.equals(user.getId())) {
                throw new DuplicateUserException("Email is already in use: " + email);
            }
        });
    }

    private void validateUsernameAndEmail(String username, String email) {
        userRepository.findByUsername(username).ifPresent(user -> {
            throw new DuplicateUserException("Username is already in use: " + username);
        });

        userRepository.findByEmail(email).ifPresent(user -> {
            throw new DuplicateUserException("Email is already in use: " + email);
        });
    }



    /**
     * Builds a new User object.
     *
     * @param userDto       The UserDto object.
     * @param hashedPassword The hashed password of the user.
     * @param salt The salt used to hash the password.
     * @return A new User object.
     */
    private @NotNull User buildNewUser(UserDto userDto, String hashedPassword, String salt) {
        logger.info("Building new user...");
        User user = new User();
        logger.info("Setting username: {}", userDto.getUsername());
        user.setUsername(userDto.getUsername());
        logger.info("Setting email: {}", userDto.getEmail());
        user.setEmail(userDto.getEmail());
        user.setPasswordHash(hashedPassword);
        user.setSalt(salt);

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