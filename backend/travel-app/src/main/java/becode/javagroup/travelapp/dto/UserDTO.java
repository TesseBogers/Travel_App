package becode.javagroup.travelapp.dto;

import becode.javagroup.travelapp.model.RoleName;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    @NotBlank
    private String username;

    @NotBlank
    private String passwordHash;

    @NotBlank
    @Email
    private String email;

    private Set<RoleName> roles;
}
