package becode.javagroup.travelapp.controller;

import becode.javagroup.travelapp.dto.RoleDto;
import becode.javagroup.travelapp.dto.UserDto;
import becode.javagroup.travelapp.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The RoleController is a REST controller that handles HTTP requests related to roles.
 * @RestController indicates that this class is a REST controller — handling HTTP requests and producing HTTP responses.
 * @RequestMapping("/api/roles") indicates that this controller handles requests to the /api/roles endpoint.
 */
@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RoleController {

    /**
     * The RoleService is used to perform CRUD operations on roles. It a dependency of this controller. Injected via autowiring. An instance of RoleService will be automatically instantiated and assigned to the roleService by Spring upon creating an instance of {@code RoleController}. Using {@code final RoleService roleService} with the {@code RequiredArgsConstructor} annotation which is equivalent to using {@code @Autowired private RoleService roleService}. Lombok will generate a constructor that takes a RoleService as an argument and assigns it to the roleService field.
     * @see RoleService
     */
    private final RoleService roleService;

    /**
     * Get all roles.
     * @return A list of all roles wrapped in a {@code ResponseEntity} indicating a successful response.
     * If there are no roles, an empty list is returned.
     */
    @GetMapping
    public ResponseEntity<List<RoleDto>> getAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    /**
     * Get a role by ID.
     * @param id extracted from the URL path variable.
     * @return The role with the given ID wrapped in a {@code ResponseEntity} indicating a successful response.
     */
    @GetMapping("/{id}")
    public ResponseEntity<RoleDto> getRoleById(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getRoleById(id));
    }

    /**
     * Get all users with a specific role.
     * @param id extracted from the URL path variable.
     * @return A list of all users with the given role wrapped in a {@code ResponseEntity} indicating a successful response.
     */
    @GetMapping("/{id}/users")
    public ResponseEntity<List<UserDto>> getUsersWithRole(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getUsersWithRole(id));
    }

    /**
     * Add a role to a user by ID.
     * @param roleId extracted from the URL path variable.
     * @param userId extracted from the URL path variable.
     * @return A {@code ResponseEntity} indicating a successful response.
     */
    // Add a role to a user
    @PostMapping("/{roleId}/users/{userId}")
    public ResponseEntity<Void> addRoleToUser(@PathVariable Long roleId, @PathVariable Long userId) {
        roleService.addRoleToUser(roleId, userId);
        return ResponseEntity.ok().build();
    }
}