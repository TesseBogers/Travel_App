package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.dto.RoleDto;
import becode.javagroup.travelapp.dto.UserDto;
import becode.javagroup.travelapp.exception.RoleNotFoundException;
import becode.javagroup.travelapp.exception.UserNotFoundException;
import becode.javagroup.travelapp.mapper.DtoMapper;
import becode.javagroup.travelapp.model.Role;
import becode.javagroup.travelapp.model.RoleName;
import becode.javagroup.travelapp.model.User;
import becode.javagroup.travelapp.repository.RoleRepository;
import becode.javagroup.travelapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * RoleService is a service class responsible for managing roles in the system.
 * It interacts with the RoleRepository to store and retrieve role data.
 * @see Service
 * @see RequiredArgsConstructor
 */
@Service
@RequiredArgsConstructor
public class RoleService {

    /**
     * The RoleRepository is injected to be able to store and retrieve role data.
     * The UserRepository is also injected to be able to assign roles to users.
     * RequiredArgsConstructor is a lombok annotation that generates the constructors for these fields.
     * The logger is used to log information, warnings and errors.
     * @see RequiredArgsConstructor
     * @see RoleRepository
     * @see UserRepository
     * @see Logger
     * @see lombok.extern.slf4j.Slf4j
     */

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final DtoMapper dtoMapper;
    private static final Logger logger = LoggerFactory.getLogger(RoleService.class);

    /**
     * Finds a role by its name.
     *
     * @param roleName the role_name of the role.
     * @return the Role object.
     * @throws RoleNotFoundException {@inheritDoc}
     */
    public Role findByName(@NotNull String roleName) {
        logger.info("Attempting to find role with roleName: {}", roleName);

        return roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new RoleNotFoundException("Error: Role not found: " + roleName));
    }

    /**
     * Creates a new role.
     *
     * @param role the role to be created.
     * @return the created Role object.
     * The @NotNull annotation is used to prevent the role from being null.
     */
    public Role createRole(@NotNull Role role) {
        logger.info("Creating new role: {}", role.getRoleName());

        return roleRepository.save(role);
    }

    /**
     * Updates an existing role.
     *
     * @param role the role to be updated.
     * @return the updated Role object.
     */
    public Role updateRole(@NotNull Role role) {
        logger.info("Updating role: {}", role.getRoleName());

        return roleRepository.save(role);
    }

    /**
     * Deletes a role.
     *
     * @param role the role to be deleted.
     */
    public void deleteRole(@NotNull Role role) {
        logger.info("Deleting role: {}", role.getRoleName());

        roleRepository.delete(role);
    }

    /**
     * Assigns a new role to a user.
     *
     * @param userId the id of the user.
     * @param roleName the name of the role to be assigned.
     * @return the User object after the role has been assigned.
     * @throws RoleNotFoundException {@inheritDoc}
     */
    public User assignRoleToUser(Long userId, String roleName) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("No user found with id = " + userId)
        );

        RoleName roleEnum;
        try {
            roleEnum = RoleName.valueOf(roleName);
        } catch (IllegalArgumentException e) {
            throw new RoleNotFoundException("Error: Role not found: " + roleName);
        }

        Role role = findByName(roleEnum.getValue());
        user.getRoles().add(role);
        userRepository.save(user);
        logger.info("Role {} assigned to user with ID: {}", roleName, user.getId());

        return user;
    }

    /**
     * Removes a role from a user.
     *
     * @param userId the id of the user.
     * @param roleName the name of the role to be removed.
     * @return the User object after the role has been removed.
     * @throws RoleNotFoundException {@inheritDoc}
     */
    public User removeRoleFromUser(Long userId, String roleName) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("No user found with id = " + userId)
        );

        RoleName roleEnum;
        try {
            roleEnum = RoleName.valueOf(roleName);
        } catch (IllegalArgumentException e) {
            throw new RoleNotFoundException("Error: Role not found: " + roleName);
        }

        Role role = findByName(roleEnum.getValue());

        if (user.getRoles().contains(role)) {
            user.getRoles().remove(role);
            userRepository.save(user);
            logger.info("Role {} removed from user with ID: {}", roleName, user.getId());
        } else {
            throw new RoleNotFoundException("This user does not have the role you want to remove.");
        }

        return user;
    }

    /**
     * Converts a Role object to a RoleDto.
     *
     * @param role the Role object to be converted.
     * @return the converted RoleDto.
     */
    private RoleDto toRoleDto(Role role) {
        return dtoMapper.toRoleDto(role);
    }

    /**
     * Fetches all the roles in the system.
     *
     * @return A list of RoleDto objects.
     */
    public List<RoleDto> getAllRoles() {
        List<Role> roles = roleRepository.findAll();

        return roles.stream()
                .map(this::toRoleDto)
                .collect(Collectors.toList());
    }

    /**
     * Fetches a role by its ID.
     *
     * @param id the ID of the role to be fetched.
     * @return the RoleDto object representing the role.
     * @throws ResourceNotFoundException when the role is not found.
     */
    public RoleDto getRoleById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id " + id));

        return toRoleDto(role);
    }

    /**
     * Adds a role to a user.
     *
     * @param roleId the ID of the role to be added.
     * @param userId the ID of the user to which the role should be added.
     * @throws ResourceNotFoundException when the role is not found.
     * @throws UserNotFoundException when the user is not found.
     */
    public void addRoleToUser(Long roleId, Long userId) {
        logger.info("Adding role with ID: {} to user with ID: {}", roleId, userId);

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id " + roleId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));

        user.getRoles().add(role);
        userRepository.save(user);

        logger.info("Role with ID: {} has been added to user with ID: {}", roleId, userId);
    }

    /**
     * Converts a User object to a UserDto.
     *
     * @param user the User object to be converted.
     * @return the converted UserDto.
     */
    private UserDto toUserDto(User user) {
        UserDto userDto = new UserDto();

        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPasswordHash());
        userDto.setEmail(user.getEmail());

        Set<String> roleNames = user.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet());

        userDto.setRoles(roleNames);

        return userDto;
    }


    /**
     * Fetches all users that have a certain role.
     *
     * @param roleId the ID of the role.
     * @return a list of UserDto objects representing the users.
     * @throws RoleNotFoundException when the role is not found.
     */
    public List<UserDto> getUsersWithRole(Long roleId) {
        logger.info("Getting users with role ID: {}", roleId);

        Role role = roleRepository.findById(roleId).orElseThrow(
                () -> new RoleNotFoundException("No role found with id = " + roleId)
        );

        return role.getUsers().stream().map(this::toUserDto).collect(Collectors.toList());
    }
}