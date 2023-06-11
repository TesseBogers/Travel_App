package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.exception.RoleNotFoundException;
import becode.javagroup.travelapp.model.Role;
import becode.javagroup.travelapp.model.RoleName;
import becode.javagroup.travelapp.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * RoleService is a service class responsible for managing roles in the system.
 * It interacts with the RoleRepository to store and retrieve role data.
 */
@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;
    private static final Logger logger = LoggerFactory.getLogger(RoleService.class);

    /**
     * Finds a role by its name.
     *
     * @param name the name of the role.
     * @return the Role object.
     * @throws RoleNotFoundException if no role is found with the given name.
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
     */
    public Optional<Role> createRole(@NotNull Role role) {
        logger.info("Creating new role: {}", role.getName());

        return Optional.of(roleRepository.save(role));
    }

    /**
     * Updates an existing role.
     *
     * @param role the role to be updated.
     * @return the updated Role object.
     */
    public Optional<Role> updateRole(@NotNull Role role) {
        logger.info("Updating role: {}", role.getName());

        return Optional.of(roleRepository.save(role));
    }

    /**
     * Deletes a role.
     *
     * @param role the role to be deleted.
     * @return void.
     */
    public Optional<Void> deleteRole(@NotNull Role role) {
        logger.info("Deleting role: {}", role.getName());

        roleRepository.delete(role);

        return Optional.empty();
    }
}