package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.exception.RoleNotFoundException;
import becode.javagroup.travelapp.exception.UserNotFoundException;
import becode.javagroup.travelapp.model.Role;
import becode.javagroup.travelapp.model.RoleName;
import becode.javagroup.travelapp.model.User;
import becode.javagroup.travelapp.repository.RoleRepository;
import becode.javagroup.travelapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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
    private static final Logger logger = LoggerFactory.getLogger(RoleService.class);

    /**
     * Finds a role by its name.
     *
     * @param name the name of the role.
     * @return the Role object.
     * @throws RoleNotFoundException {@inheritDoc}
     */
    public Role findByName(@NotNull RoleName name) {
        logger.info("Attempting to find role with name: {}", name.name());

        return roleRepository.findByName(name.name())
                .orElseThrow(() -> new RoleNotFoundException("Error: Role not found: " + name));
    }

    /**
     * Creates a new role.
     *
     * @param role the role to be created.
     * @return the created Role object.
     * The @NotNull annotation is used to prevent the role from being null.
     */
    public Role createRole(@NotNull Role role) {
        logger.info("Creating new role: {}", role.getName());

        return roleRepository.save(role);
    }

    /**
     * Updates an existing role.
     *
     * @param role the role to be updated.
     * @return the updated Role object.
     */
    public Role updateRole(@NotNull Role role) {
        logger.info("Updating role: {}", role.getName());

        return roleRepository.save(role);
    }

    /**
     * Deletes a role.
     *
     * @param role the role to be deleted.
     */
    public void deleteRole(@NotNull Role role) {
        logger.info("Deleting role: {}", role.getName());

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
    public User assignRoleToUser(Long userId, RoleName roleName) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("No user found with id = " + userId)
        );
        Role role = findByName(roleName);
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
    public User removeRoleFromUser(Long userId, RoleName roleName) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("No user found with id = " + userId)
        );
        Role role = findByName(roleName);

        if (user.getRoles().contains(role)) {
            user.getRoles().remove(role);
            userRepository.save(user);
            logger.info("Role {} removed from user with ID: {}", roleName, user.getId());
        } else {
            throw new RoleNotFoundException("This user does not have the role you want to remove.");
        }

        return user;
    }
}