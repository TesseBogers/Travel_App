package becode.javagroup.travelapp.controller;

import becode.javagroup.travelapp.dto.RoleDto;
import becode.javagroup.travelapp.dto.UserDto;
import becode.javagroup.travelapp.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RoleController {

    private final RoleService roleService;

    @GetMapping
    public ResponseEntity<List<RoleDto>> getAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDto> getRoleById(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getRoleById(id));
    }

    @GetMapping("/{id}/users")
    public ResponseEntity<List<UserDto>> getUsersWithRole(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getUsersWithRole(id));
    }

    // Add a role to a user
    @PostMapping("/{roleId}/users/{userId}")
    public ResponseEntity<Void> addRoleToUser(@PathVariable Long roleId, @PathVariable Long userId) {
        roleService.addRoleToUser(roleId, userId);
        return ResponseEntity.ok().build();
    }
}