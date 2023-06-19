package becode.javagroup.travelapp.controller;

import becode.javagroup.travelapp.configuration.JwtUtil;
import becode.javagroup.travelapp.dto.AuthenticationResponseDto;
import becode.javagroup.travelapp.dto.LoginRequestDto;
import becode.javagroup.travelapp.dto.UserDto;
import becode.javagroup.travelapp.dto.UserResponseDto;
import becode.javagroup.travelapp.exception.DuplicateUserException;
import becode.javagroup.travelapp.exception.RoleNotFoundException;
import becode.javagroup.travelapp.exception.UserNotFoundException;
import becode.javagroup.travelapp.exception.AuthenticationException;
import becode.javagroup.travelapp.model.RoleName;
import becode.javagroup.travelapp.model.User;
import becode.javagroup.travelapp.repository.UserRepository;
import becode.javagroup.travelapp.service.RoleService;
import becode.javagroup.travelapp.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import becode.javagroup.travelapp.model.Permission;
import becode.javagroup.travelapp.model.Role;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;
    private final RoleService roleService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> users = userService.findAllUsers()
                .stream()
                .map(UserResponseDto::new)
                .collect(Collectors.toList());
        return users.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
        User user = userService.findUserById(id);
        return user == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(new UserResponseDto(user));
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody @NotNull UserDto userDto) {
        log.info("Attempting to create a user...");
        try {
            UserResponseDto userResponseDto = userService.createUser(userDto);
            log.info("User created successfully");
            return ResponseEntity.ok(userResponseDto);
        } catch (DuplicateUserException exception) {
            log.error("Duplicate user error", exception);
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (RoleNotFoundException exception) {
            log.error("Role not found error", exception);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) throws AuthenticationException {
        String jwt = userService.authenticateUser(loginRequestDto.getUsername(), loginRequestDto.getPassword());
        return ResponseEntity.ok(new AuthenticationResponseDto(jwt));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponseDto> refresh(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
        String jwt = jwtUtil.generateToken(user);
        return ResponseEntity.ok(new AuthenticationResponseDto(jwt));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getCurrentUser(HttpServletRequest request) {
        try {
            User user = userService.getCurrentUser(request);
            return ResponseEntity.ok(new UserResponseDto(user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }



    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long id, @Valid @RequestBody @NotNull UserDto userDetails) {
        try {
            User user = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(new UserResponseDto(user));
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/roles")
    public ResponseEntity<UserResponseDto> assignRolesToUser(@PathVariable Long id, @RequestBody @NotNull Set<String> roleNames) {
        try {
            roleNames.forEach(roleName -> {
                try {
                    roleService.assignRoleToUser(id, String.valueOf(RoleName.valueOf(roleName)));
                } catch (IllegalArgumentException e) {
                    throw new RoleNotFoundException(roleName);
                }
            });
            User user = userService.findUserById(id);
            return user == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(new UserResponseDto(user));
        } catch (UserNotFoundException | RoleNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}/roles")
    public ResponseEntity<UserResponseDto> removeRolesFromUser(@PathVariable Long id, @RequestBody @NotNull Set<String> roleNames) {
        try {
            roleNames.forEach(roleName -> {
                try {
                    roleService.removeRoleFromUser(id, String.valueOf(RoleName.valueOf(roleName)));
                } catch (IllegalArgumentException e) {
                    throw new RoleNotFoundException(roleName);
                }
            });
            User user = userService.findUserById(id);
            return user == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(new UserResponseDto(user));
        } catch (UserNotFoundException | RoleNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserResponseDto> getUserByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        return user == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(new UserResponseDto(user));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserResponseDto> getUserByEmail(@PathVariable String email) {
        User user = userService.findByEmail(email);
        return user == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(new UserResponseDto(user));
    }

    @GetMapping("/traveling")
    public ResponseEntity<List<UserResponseDto>> getUsersTraveling() {
        List<UserResponseDto> users = userService.findUsersTraveling()
                .stream()
                .map(UserResponseDto::new)
                .collect(Collectors.toList());
        return users.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(users);
    }

    @GetMapping("/roles/{roleName}")
    public ResponseEntity<List<UserResponseDto>> getUsersWithRole(@PathVariable String roleName) {
        List<UserResponseDto> users = userService.findUsersWithRole(RoleName.valueOf(roleName))
                .stream()
                .map(UserResponseDto::new)
                .collect(Collectors.toList());
        return users.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(users);
    }

    @GetMapping("/permissions/{permissionName}")
    public ResponseEntity<List<UserResponseDto>> getUsersWithPermission(@PathVariable String permissionName) {
        List<UserResponseDto> users = userService.findUsersWithPermission(permissionName)
                .stream()
                .map(UserResponseDto::new)
                .collect(Collectors.toList());
        return users.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(users);
    }

    @GetMapping("/{id}/roles")
    public ResponseEntity<Set<Role>> getRolesForUser(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(userService.getRolesForUser(id));
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/permissions")
    public ResponseEntity<Set<Permission>> getPermissionsForUser(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(userService.getPermissionsForUser(id));
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}