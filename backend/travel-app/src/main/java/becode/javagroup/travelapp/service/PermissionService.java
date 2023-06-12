package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.exception.PermissionNotFoundException;
import becode.javagroup.travelapp.model.Permission;
import becode.javagroup.travelapp.model.PermissionName;
import becode.javagroup.travelapp.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * PermissionService is a service class responsible for managing permissions in the system.
 * It interacts with the PermissionRepository to store and retrieve permission data.
 */
@Service
@RequiredArgsConstructor
public class PermissionService {

    /**
     * The PermissionRepository is injected to be able to store and retrieve permission data.
     * RequiredArgsConstructor is a lombok annotation that generates the constructors for this field.
     * The logger is used to log information, warnings and errors.
     * @see RequiredArgsConstructor
     * @see PermissionRepository
     * @see Logger
     * @see lombok.extern.slf4j.Slf4j
     */
    private final PermissionRepository permissionRepository;
    private static final Logger logger = LoggerFactory.getLogger(PermissionService.class);

    /**
     * Finds a permission by its name.
     *
     * @param name the name of the permission.
     * @return the Permission object.
     * @throws PermissionNotFoundException {@inheritDoc}
     */
    public Permission findByName(@NotNull PermissionName name) {
        logger.info("Attempting to find permission with name: {}", name.name());

        return permissionRepository.findByName(name.name())
                .orElseThrow(() -> new PermissionNotFoundException("Error:Permission not found: " + name));
    }

    /**
     * Creates a new permission.
     *
     * @param permission the permission to be created.
     * @return the created Permission object.
     */
    public Optional<Permission> createPermission(@NotNull Permission permission) {
        logger.info("Creating new permission: {}", permission.getName());

        return Optional.of(permissionRepository.save(permission));
    }

    /**
     * Updates an existing permission.
     *
     * @param permission the permission to be updated.
     * @return the updated Permission object.
     */
    public Optional<Permission> updatePermission(@NotNull Permission permission) {
        logger.info("Updating permission: {}", permission.getName());

        return Optional.of(permissionRepository.save(permission));
    }

    /**
     * Deletes a permission.
     *
     * @param permission the permission to be deleted.
     * @return void.
     */
    public Optional<Void> deletePermission(@NotNull Permission permission) {
        logger.info("Deleting permission: {}", permission.getName());

        permissionRepository.delete(permission);

        return Optional.empty();
    }
}