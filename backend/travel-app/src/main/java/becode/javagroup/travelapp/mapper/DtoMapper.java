package becode.javagroup.travelapp.mapper;

import becode.javagroup.travelapp.dto.RoleDto;
import becode.javagroup.travelapp.dto.PermissionDto;
import becode.javagroup.travelapp.model.Role;
import becode.javagroup.travelapp.model.Permission;
import becode.javagroup.travelapp.model.RoleName;
import becode.javagroup.travelapp.model.User;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Component for mapping domain models to DTOs.
 */
@Component
public class DtoMapper {

    /**
     * Maps Role entity to Role DTO.
     *
     * @param role The Role entity.
     * @return The RoleDto object.
     */
    public RoleDto toRoleDto(Role role) {
        RoleDto roleDto = new RoleDto();

        roleDto.setId(role.getId());
        roleDto.setName(role.getName());
        roleDto.setRoleName(RoleName.valueOf(role.getName()));

        Set<Long> userIds = role.getUsers().stream()
                .map(User::getId)
                .collect(Collectors.toSet());
        roleDto.setUserIds(userIds);

        Set<Long> permissionIds = role.getPermissions().stream()
                .map(Permission::getId)
                .collect(Collectors.toSet());
        roleDto.setPermissionIds(permissionIds);

        return roleDto;
    }

    /**
     * Maps Permission entity to Permission DTO.
     *
     * @param permission The Permission entity.
     * @return The PermissionDto object.
     */
    public PermissionDto toPermissionDto(Permission permission) {
        PermissionDto permissionDto = new PermissionDto();

        permissionDto.setId(permission.getId());
        permissionDto.setName(permission.getName());
        permissionDto.setPermissionName(permission.getPermissionName());

        Set<Long> rolesIds = permission.getRoles().stream().map(Role::getId).collect(Collectors.toSet());
        permissionDto.setRoleIds(rolesIds);

        return permissionDto;
    }
}