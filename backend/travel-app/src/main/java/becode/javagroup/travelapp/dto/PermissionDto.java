package becode.javagroup.travelapp.dto;

import becode.javagroup.travelapp.model.PermissionName;
import lombok.*;

import java.util.Set;

/**
 * This class represents a Data Transfer Object (DTO) for a permission. It is used for transferring permission data between different layers or components of the application.
 * It contains the necessary fields to represent a permission and the associated roles.
 */
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PermissionDto {
    /**
     * The permissionName is an enumeration representing the name of the permission.
     */
    private String permissionName;

    /**
     * The roleIds is a Set of Long values representing the IDs of the roles associated with this permission.
     */
    private Set<Long> roleIds;
}