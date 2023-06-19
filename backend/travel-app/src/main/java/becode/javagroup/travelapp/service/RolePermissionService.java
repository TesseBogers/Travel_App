package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.model.Permission;
import becode.javagroup.travelapp.model.PermissionName;
import becode.javagroup.travelapp.model.Role;
import becode.javagroup.travelapp.model.RoleName;
import becode.javagroup.travelapp.repository.PermissionRepository;
import becode.javagroup.travelapp.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RolePermissionService {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;


    @Transactional
    public void initRolesAndPermissions() {
        for (RoleName roleName : RoleName.values()) {
            if (!roleRepository.existsByRoleName(roleName.getValue())) {
                Role role = new Role();
                role.setRoleName(roleName.getValue());
                roleRepository.save(role);
            }
        }

        for (PermissionName permissionName : PermissionName.values()) {
            if (!permissionRepository.existsByPermissionName(permissionName.getValue())) {
                Permission permission = new Permission();
                permission.setPermissionName(permissionName.getValue());
                permissionRepository.save(permission);
            }
        }

        // Assign permissions to roles
        assignPermissions(RoleName.ROLE_ADMIN, PermissionName.values()); // all permissions for admin
        assignPermissions(RoleName.ROLE_MODERATOR, PermissionName.PERMISSION_READ, PermissionName.PERMISSION_UPDATE, PermissionName.PERMISSION_DELETE); // read, update, delete for moderator
        assignPermissions(RoleName.ROLE_USER, PermissionName.PERMISSION_READ); // only read for user
        assignPermissions(RoleName.ROLE_TRAVELER, PermissionName.PERMISSION_READ); // only read for traveler
    }

    private void assignPermissions(RoleName roleName, PermissionName... permissions) {
        Optional<Role> roleOptional = roleRepository.findByRoleName(roleName.getValue());
        if (roleOptional.isPresent()) {
            Role role = roleOptional.get();
            Set<Permission> rolePermissions = new HashSet<>();
            for (PermissionName permissionName : permissions) {
                Optional<Permission> permissionOptional = permissionRepository.findByPermissionName(permissionName.getValue());
                // replaced optional presence condition with functional style expression
                permissionOptional.ifPresent(rolePermissions::add);
            }
            role.setPermissions(rolePermissions);
            roleRepository.save(role);
        }
    }

}