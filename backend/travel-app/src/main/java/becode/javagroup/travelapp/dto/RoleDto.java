package becode.javagroup.travelapp.dto;

import becode.javagroup.travelapp.model.RoleName;
import lombok.*;

import java.util.Set;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {

    private Long id;

    private String roleName;

    private Set<Long> userIds;

    private Set<Long> permissionIds;
}