package becode.javagroup.travelapp.dto;

import becode.javagroup.travelapp.model.RoleName;
import lombok.*;

import java.util.Set;

/**
 * This class represents a Data Transfer Object (DTO) for a role. It is used for transferring role data between different layers or components of the application.
 * It contains the necessary fields to represent a role and the associated users and permissions.
 */
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {
    /**
     * The id is a unique identifier for this role.
     */
    private Long id;

    /**
     * The roleName is an enumeration representing the descriptive name of the role.
     */
    private String roleName;

    /**
     * The userIds is a Set of Long values representing the IDs of the users associated with this role.
     */
    private Set<Long> userIds;

    /**
     * The permissionIds is a Set of Long values representing the IDs of the permissions associated with this role.
     */
    private Set<Long> permissionIds;
}