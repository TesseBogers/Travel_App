package becode.javagroup.travelapp.controller;

import becode.javagroup.travelapp.model.Role;
import becode.javagroup.travelapp.model.RoleName;
import becode.javagroup.travelapp.model.User;
import becode.javagroup.travelapp.repository.UserRepository;

import becode.javagroup.travelapp.service.RoleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final RoleService roleService;

    @GetMapping("/dummyUsers")
    public List<User> createDummyUsers() {
        User user1 = new User();
        user1.setUsername("username1");
        user1.setEmail("user1@example.com");

        User user2 = new User();
        user2.setUsername("username2");
        user2.setEmail("user2@example.com");

        List<User> users = Arrays.asList(user1, user2);

        userRepository.saveAll(users);

        return users;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(value -> ResponseEntity.ok().body(value)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public User createUser(@Valid @RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/{id}/roles")
    public ResponseEntity<User> assignRolesToUser(@PathVariable(value = "id") Long userId, @RequestBody Set<RoleName> roleNames) {
        return getUserResponseEntity(userId, roleNames);
    }

    @NotNull
    private ResponseEntity<User> getUserResponseEntity(@PathVariable("id") Long userId, @RequestBody Set<RoleName> roleNames) {
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isPresent()) {
            User user = userOptional.get();
            Set<Role> roles = roleNames.stream()
                    .map(roleService::findByName)
                    .collect(Collectors.toSet());
            user.setRoles(roles);
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long userId, @Valid @RequestBody User userDetails) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            User updatedUser = user.get();
            updatedUser.setUsername(userDetails.getUsername());
            updatedUser.setPasswordHash(userDetails.getPasswordHash());
            updatedUser.setEmail(userDetails.getEmail());
            updatedUser.setRoles(userDetails.getRoles());
            updatedUser.setProfile(userDetails.getProfile());
            userRepository.save(updatedUser);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/roles")
    public ResponseEntity<User> updateUserRoles(@PathVariable(value = "id") Long userId, @RequestBody Set<RoleName> roleNames) {
        return getUserResponseEntity(userId, roleNames);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable(value = "id") Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            userRepository.delete(user.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}/roles")
    public ResponseEntity<User> removeRolesFromUser(@PathVariable(value = "id") Long userId, @RequestBody Set<RoleName> roleNames) {
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isPresent()) {
            User user = userOptional.get();
            Set<Role> rolesToRemove = roleNames.stream()
                    .map(roleService::findByName)
                    .collect(Collectors.toSet());
            user.getRoles().removeAll(rolesToRemove);
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}

