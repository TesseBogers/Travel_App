package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.dto.PermissionDto;
import becode.javagroup.travelapp.dto.RoleDto;
import becode.javagroup.travelapp.exception.PermissionNotFoundException;
import becode.javagroup.travelapp.exception.RoleNotFoundException;
import becode.javagroup.travelapp.mapper.DtoMapper;
import becode.javagroup.travelapp.model.Permission;
import becode.javagroup.travelapp.model.PermissionName;
import becode.javagroup.travelapp.model.Role;
import becode.javagroup.travelapp.repository.PermissionRepository;
import becode.javagroup.travelapp.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
     *
     * @see RequiredArgsConstructor
     * @see PermissionRepository
     * @see Logger
     * @see lombok.extern.slf4j.Slf4j
     */
    private final PermissionRepository permissionRepository;
    private final RoleRepository roleRepository;
    private final DtoMapper dtoMapper;
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

    /**
     * Get all existing permissions.
     *
     * @return A list of PermissionDto representing all existing permissions.
     */
    public List<PermissionDto> getAllPermissions() {
        List<Permission> permissions = permissionRepository.findAll();

        return permissions.stream()
                .map(this::toPermissionDto)
                .collect(Collectors.toList());
    }

    /**
     * Fetch a permission by its ID.
     *
     * @param id The ID of the permission.
     * @return The PermissionDto of the permission fetched.
     * @throws PermissionNotFoundException when the permission is not found.
     */
    public PermissionDto getPermissionById(Long id) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new PermissionNotFoundException("Error: Permission not found: " + id));

        return toPermissionDto(permission);
    }

    /**
     * Convert a Permission object to a PermissionDto object.
     *
     * @param permission The Permission object to be converted.
     * @return The PermissionDto object.
     */
    private PermissionDto toPermissionDto(Permission permission) {
        return dtoMapper.toPermissionDto(permission);
    }

    /**
     * Fetch all roles that have a certain permission.
     *
     * @param id The ID of the permission.
     * @return A list of RoleDto representing all roles that have this permission.
     * @throws PermissionNotFoundException when the permission is not found.
     */
    public List<RoleDto> getRolesWithPermission(Long id) {
        logger.info("Attempting to find roles with permission: {}", id);

        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new PermissionNotFoundException("Error: Permission not found: " + id));

        return permission.getRoles().stream().map(this::toRoleDto).collect(Collectors.toList());
    }

    /**
     * Convert a Role object to a RoleDto object.
     *
     * @param role The Role object to be converted.
     * @return The RoleDto object.
     */
    private RoleDto toRoleDto(Role role) {
        return dtoMapper.toRoleDto(role);
    }


    /**
     * Add a certain permission to a role.
     *
     * @param permissionId The ID of the permission to be added.
     * @param roleId       The ID of the role where the permission should be added.
     * @throws PermissionNotFoundException when the permission is not found.
     * @throws RoleNotFoundException       when the role is not found.
     */
    public void addPermissionToRole(Long permissionId, Long roleId) {
        logger.info("Attempting to add permission: {} to role: {}", permissionId, roleId);

        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new PermissionNotFoundException("Error: Permission not found: " + permissionId));

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RoleNotFoundException("Error: Role not found: " + roleId));
        role.getPermissions().add(permission);
        roleRepository.save(role);
    }

    /**
     * Remove a certain permission from a role.
     *
     * @param permissionId The ID of the permission to be removed.
     * @param roleId       The ID of the role from which the permission should be removed.
     * @throws PermissionNotFoundException when the permission or the role-permission relation is not found.
     * @throws RoleNotFoundException       when the role is not found.
     */
    public void removePermissionFromRole(Long permissionId, Long roleId) {
        logger.info("Attempting to remove permission: {} from role: {}", permissionId, roleId);
        // Fetch the role
        Role role = roleRepository.findById(roleId).orElseThrow(
                () -> new RoleNotFoundException("No role found with id = " + roleId)
        );
        // Fetch the permission
        Permission permission = permissionRepository.findById(permissionId).orElseThrow(
                () -> new PermissionNotFoundException("No permission found with id = " + permissionId)
        );
        // Remove the permission from the role
        if (role.getPermissions().contains(permission)) {
            role.getPermissions().remove(permission);
            roleRepository.save(role);
            logger.info("Permission {} removed from role with ID: {}", permissionId, roleId);
        } else {
            throw new PermissionNotFoundException("This role does not have the permission you want to remove.");
        }
    }
}