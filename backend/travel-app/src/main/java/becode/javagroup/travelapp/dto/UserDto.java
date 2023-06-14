package becode.javagroup.travelapp.dto;

import becode.javagroup.travelapp.model.RoleName;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * Data Transfer Object for User. The DTO is used to transfer data between the client and the server.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    /**
     * The id of the user. The @NotBlank annotation is used to validate that the id is not blank.
     * @see NotBlank
     */
    @NotBlank
    private String username;

    /**
     * The password hash of the user. The @NotBlank annotation is used to validate that the password hash is not blank.
     * @see NotBlank
     */
    @NotBlank
    private String passwordHash;

    /**
     * The email of the user. The @NotBlank and @Email annotations are used to validate that the email is not blank and is a valid email address.
     * @see NotBlank
     * @see Email
     */
    @NotBlank
    @Email
    private String email;

    /**
     * The roles of the user. It is a set of RoleName objects which represent the roles of the user.
     * @see RoleName
     */
    private Set<RoleName> roles;
}