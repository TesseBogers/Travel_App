package becode.javagroup.travelapp.controller;

import becode.javagroup.travelapp.dto.UserDTO;
import becode.javagroup.travelapp.exception.DuplicateUserException;
import becode.javagroup.travelapp.exception.UserNotFoundException;
import becode.javagroup.travelapp.model.RoleName;
import becode.javagroup.travelapp.model.User;
import becode.javagroup.travelapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long userId) {
        User user = userService.findUserById(userId);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody @NotNull UserDTO userDTO) {
        try {
            Optional<User> createdUserOpt = userService.createUser(userDTO.getUsername(), userDTO.getPasswordHash(), userDTO.getEmail(), userDTO.getRoles());
            // If user could not be created due to conflict
            return createdUserOpt.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.CONFLICT));
        } catch (DuplicateUserException exception) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long userId, @Valid @RequestBody @NotNull UserDTO userDetails) {
        try {
            Optional<User> updatedUserOpt = userService.updateUser(userId, userDetails.getUsername(), userDetails.getPasswordHash(), userDetails.getEmail(), userDetails.getRoles());
            return updatedUserOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (UserNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable(value = "id") Long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok().build();
        } catch (UserNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/roles")
    public ResponseEntity<User> assignRolesToUser(@PathVariable(value = "id") Long userId, @RequestBody @NotNull Set<RoleName> roleNames) {
        try {
            for (RoleName roleName : roleNames) {
                userService.assignRoleToUser(userId, roleName);
            }
            User userWithNewRoles = userService.findUserById(userId);
            return ResponseEntity.ok(userWithNewRoles);
        } catch (UserNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}/roles")
    public ResponseEntity<User> removeRolesFromUser(@PathVariable(value = "id") Long userId, @RequestBody @NotNull Set<RoleName> roleNames) {
        try {
            for (RoleName roleName : roleNames) {
                userService.removeRoleFromUser(userId, roleName);
            }
            User userWithoutRoles = userService.findUserById(userId);
            return ResponseEntity.ok(userWithoutRoles);
        } catch (UserNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}