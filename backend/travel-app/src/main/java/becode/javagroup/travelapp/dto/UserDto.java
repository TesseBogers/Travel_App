package becode.javagroup.travelapp.dto;

import becode.javagroup.travelapp.model.RoleName;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Set;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    @NotBlank
    private String username;

    @NotBlank
    private String passwordHash;

    @NotBlank
    @Email
    private String email;

    private Set<RoleName> roles;
}
