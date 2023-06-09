package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.dto.UserDto;
import becode.javagroup.travelapp.dto.UserResponseDto;
import becode.javagroup.travelapp.dto.UserProfileDto;
import becode.javagroup.travelapp.configuration.JwtUtil;
import becode.javagroup.travelapp.exception.DuplicateUserException;
import becode.javagroup.travelapp.exception.PermissionNotFoundException;
import becode.javagroup.travelapp.exception.UserNotFoundException;
import becode.javagroup.travelapp.exception.UserProfileNotFoundException;
import becode.javagroup.travelapp.exception.AuthenticationException;
import becode.javagroup.travelapp.mapper.UserProfileMapper;
import becode.javagroup.travelapp.model.*;
import becode.javagroup.travelapp.repository.PermissionRepository;
import becode.javagroup.travelapp.repository.RoleRepository;
import becode.javagroup.travelapp.repository.UserProfileRepository;
import becode.javagroup.travelapp.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserProfileMapper userProfileMapper;
    private final PermissionRepository permissionRepository;
    private final UserProfileRepository userProfileRepository;
    private final JwtUtil jwtUtil;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

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

    public String authenticateUser(String username, String password) throws AuthenticationException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));

        if (user.getPassword() == null || !BCrypt.checkpw(password, user.getPassword())) {
            throw new AuthenticationException("Hashed Passwords do not match: " + user.getPassword());
        }

        return jwtUtil.generateToken(user);
    }

    public User getCurrentUser(HttpServletRequest request) {
        String jwt = (String) request.getAttribute("jwt");
        if (jwt == null) {
            throw new AuthenticationException("No JWT token found in request");
        }

        String username = jwtUtil.extractUsername(jwt);
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
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

    public Set<Role> fetchRoles(Set<String> roleNames) {
        Set<Role> roles = new HashSet<>();

        for (String roleName : roleNames) {
            Role role = roleRepository.findByRoleName(roleName)
                    .orElseGet(() -> {
                        Role newRole = new Role();
                        newRole.setRoleName(roleName);
                        roleRepository.save(newRole);
                        return newRole;
                    });

            role.getPermissions().clear(); // clear existing permissions
            assignPermissionsToRole(role, roleName);

            roles.add(role);
        }

        return roles;
    }

    private void assignPermissionsToRole(Role role, String roleName) {
        switch (roleName) {
            case "USER" -> assignUserPermissions(role);
            case "ADMIN" -> assignAdminPermissions(role);
            case "MODERATOR" -> assignModeratorPermissions(role);
            case "TRAVELER" -> assignTravelerPermissions(role);
            default -> throw new IllegalArgumentException("Invalid role: " + roleName);
        }
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

    public boolean checkPassword(User user, String passwordToCheck) {
        return BCrypt.checkpw(passwordToCheck, user.getPassword());
    }

    @Transactional
    public User updateUser(Long id, UserDto userDto) {
        User existingUser = findUserById(id);
        validateUsernameAndEmail(id, userDto.getUsername(), userDto.getEmail());

        existingUser.setUsername(userDto.getUsername());
        existingUser.setEmail(userDto.getEmail());

        if(userDto.getPassword() != null && !userDto.getPassword().isEmpty()){
            String salt = BCrypt.gensalt(); // Create a new unique salt
            existingUser.setSalt(salt); // Store the salt with the user
            existingUser.setPassword(hashPassword(userDto.getPassword(), salt));
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

    public void deleteUser(Long id) {
        User user = findUserById(id);
        userRepository.delete(user);
        logger.info("User deleted with ID: {}", user.getId());
    }

    public User findUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("No user found with id = " + id));

        UserProfile userProfile = user.getUserProfile();
        if (userProfile == null) {
            throw new UserProfileNotFoundException("No UserProfile found for user with id = " + id);
        }
        return user;
    }

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

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new DuplicateUserException("Email is already in use: " + email));
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new DuplicateUserException("Username is already in use: " + username));
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }


    // Private methods...
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

    private @NotNull User buildNewUser(UserDto userDto, String hashedPassword, String salt) {
        logger.info("Building new user...");
        User user = new User();
        logger.info("Setting username: {}", userDto.getUsername());
        user.setUsername(userDto.getUsername());
        logger.info("Setting email: {}", userDto.getEmail());
        user.setEmail(userDto.getEmail());
        user.setPassword(hashedPassword);
        user.setSalt(salt);

        return user;
    }

    public List<User> findUsersTraveling() {
        logger.info("Finding users traveling...");
        return userRepository.findUsersTraveling(RoleName.ROLE_TRAVELER);
    }

    public List<User> findUsersWithRole(RoleName roleName) {
        logger.info("Finding users with role: {}", roleName);
        return userRepository.findUsersWithRole(roleName);
    }

    public List<User> findUsersWithPermission(String permissionName) {
        logger.info("Finding users with permission: {}", permissionName);
        return userRepository.findUsersWithPermission(permissionName);
    }

    public Set<Role> getRolesForUser(Long id) {
        logger.info("Getting roles for user with id: {}", id);
        return userRepository.getRolesForUser(id);
    }

    public Set<Permission> getPermissionsForUser(Long id) {
        logger.info("Getting permissions for user with id: {}", id);
        return userRepository.getPermissionsForUser(id);
    }
}