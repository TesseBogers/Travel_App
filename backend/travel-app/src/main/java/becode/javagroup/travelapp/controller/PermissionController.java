package becode.javagroup.travelapp.controller;

import becode.javagroup.travelapp.dto.PermissionDto;
import becode.javagroup.travelapp.dto.RoleDto;
import becode.javagroup.travelapp.service.PermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for managing permissions.
 * This class delegates the business logic to the PermissionService class.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/permissions")
@CrossOrigin(origins = "http://localhost:5173")
public class PermissionController {

    private final PermissionService permissionService;

    /**
     * Get all permissions.
     *
     * @return A response entity containing the list of all permissions.
     */
    @GetMapping
    public ResponseEntity<List<PermissionDto>> getAllPermissions() {
        return ResponseEntity.ok(permissionService.getAllPermissions());
    }

    /**
     * Get a specific permission by its ID.
     *
     * @param id The ID of the permission.
     * @return A response entity containing the requested permission.
     */
    @GetMapping("/{id}")
    public ResponseEntity<PermissionDto> getPermissionById(@PathVariable Long id) {
        return ResponseEntity.ok(permissionService.getPermissionById(id));
    }

    /**
     * Get all roles with a specific permission.
     *
     * @param id The ID of the permission.
     * @return A response entity containing the list of roles with the given permission.
     */
    @GetMapping("/{id}/roles")
    public ResponseEntity<List<RoleDto>> getRolesWithPermission(@PathVariable Long id) {
        return ResponseEntity.ok(permissionService.getRolesWithPermission(id));
    }

    /**
     * Add a permission to a role.
     *
     * @param permissionId The ID of the permission to add.
     * @param roleId       The ID of the role to which the permission should be added.
     * @return A response entity indicating success (HTTP 200).
     */
    @PostMapping("/{permissionId}/roles/{roleId}")
    public ResponseEntity<Void> addPermissionToRole(@PathVariable Long permissionId, @PathVariable Long roleId) {
        permissionService.addPermissionToRole(permissionId, roleId);
        return ResponseEntity.ok().build(); // Returns HTTP 200 to indicate success
    }

    /**
     * Remove a permission from a role.
     *
     * @param permissionId The ID of the permission to remove.
     * @param roleId       The ID of the role from which the permission should be removed.
     * @return A response entity indicating success (HTTP 200).
     */
    @DeleteMapping("/{permissionId}/roles/{roleId}")
    public ResponseEntity<Void> removePermissionFromRole(@PathVariable Long permissionId, @PathVariable Long roleId) {
        permissionService.removePermissionFromRole(permissionId, roleId);
        return ResponseEntity.ok().build(); // Returns HTTP 200 to indicate success
    }
}