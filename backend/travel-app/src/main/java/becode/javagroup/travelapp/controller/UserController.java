package becode.javagroup.travelapp.controller;

import becode.javagroup.travelapp.dto.UserDto;
import becode.javagroup.travelapp.exception.DuplicateUserException;
import becode.javagroup.travelapp.exception.RoleNotFoundException;
import becode.javagroup.travelapp.exception.UserNotFoundException;
import becode.javagroup.travelapp.model.RoleName;
import becode.javagroup.travelapp.model.User;
import becode.javagroup.travelapp.service.RoleService;
import becode.javagroup.travelapp.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.Optional;


/**
 * This class serves as a controller for managing user-related operations.
 * It handles HTTP requests related to users and delegates the actual operations to the UserService.
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    /**
     * The UserService that is used to perform the actual operations.
     * It is final because it should never be changed.
     * It is initialized through the constructor.
     * @see UserService
     * @see RoleService
     * @see RequiredArgsConstructor
     */
    private final UserService userService;
    private final RoleService roleService;

    /**
     * Get all users.
     * @return A list of all users.
     * If there are no users, an empty list is returned.
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        return users.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(users);
    }

    /**
     * Get a user by ID.
     * @param id The ID of the user.
     * @return The user with the given ID.
     * If there is no user with the given ID, a 404 Not Found status is returned.
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.of(Optional.ofNullable(userService.findUserById(id)));
    }

    /**
     * Create a new user.
     * @param userDto The details of the user to create.
     * @return The created user.
     * If the username or email is already in use, a 409 Conflict status is returned.
     */
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody @NotNull UserDto userDto) {
        try {
            User user = userService.createUser(
                    userDto.getUsername(),
                    userDto.getPasswordHash(),
                    userDto.getEmail(),
                    userDto.getRoles()
            );
            return ResponseEntity.ok(user);
        } catch (DuplicateUserException exception) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    /**
     * Update a user.
     * @param id The ID of the user to update.
     * @param userDetails The details of the user to update.
     * @return The updated user.
     * If there is no user with the given ID, a 404 Not Found status is returned.
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody @NotNull UserDto userDetails) {
        try {
            User user = userService.updateUser(
                    id,
                    userDetails.getUsername(),
                    userDetails.getPasswordHash(),
                    userDetails.getEmail(),
                    userDetails.getRoles()
            );
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


    /**
     * Delete a user.
     * @param id The ID of the user to delete.
     * @return An empty response.
     * If there is no user with the given ID, a 404 Not Found status is returned.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Assign roles to a user.
     * @param id The ID of the user to assign roles to.
     * @param roleNames The names of the roles to assign.
     * @return The updated user.
     * If there is no user with the given ID, a 404 Not Found status is returned.
     * If there is no role with one of the given names, a 404 Not Found status is returned.
     */
    @PostMapping("/{id}/roles")
    public ResponseEntity<User> assignRolesToUser(@PathVariable Long id, @RequestBody @NotNull Set<RoleName> roleNames) {
        try {
            roleNames.forEach(roleName -> roleService.assignRoleToUser(id, roleName));
            return ResponseEntity.of(Optional.ofNullable(userService.findUserById(id)));
        } catch (UserNotFoundException | RoleNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Remove roles from a user.
     * @param id The ID of the user to remove roles from.
     * @param roleNames The names of the roles to remove.
     * @return The updated user.
     * If there is no user with the given ID, a 404 Not Found status is returned.
     * If there is no role with one of the given names, a 404 Not Found status is returned.
     */
    @DeleteMapping("/{id}/roles")
    public ResponseEntity<User> removeRolesFromUser(@PathVariable Long id, @RequestBody @NotNull Set<RoleName> roleNames) {
        try {
            roleNames.forEach(roleName -> roleService.removeRoleFromUser(id, roleName));
            return ResponseEntity.of(Optional.ofNullable(userService.findUserById(id)));
        } catch (UserNotFoundException | RoleNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Get a user by username.
     * @param username The username of the user.
     * @return The user with the given username.
     * If there is no user with the given username, a 404 Not Found status is returned.
     */
    @GetMapping("/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.of(Optional.ofNullable(userService.findByUsername(username)));
    }

    /**
     * Get a user by email.
     * @param email The email of the user.
     * @return The user with the given email.
     * If there is no user with the given email, a 404 Not Found status is returned.
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.of(Optional.ofNullable(userService.findByEmail(email)));
    }
}