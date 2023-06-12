package becode.javagroup.travelapp.dto;

import becode.javagroup.travelapp.model.PermissionName;
import lombok.*;

import java.util.Set;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PermissionDto {
    private Long id;
    private PermissionName permissionName;
    private String name;
    private Set<Long> roleIds;
}
