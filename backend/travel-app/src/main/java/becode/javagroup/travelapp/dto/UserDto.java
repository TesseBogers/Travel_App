package becode.javagroup.travelapp.dto;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private String username;

    private String password;


    @Email
    private String email;

    private Set<String> roles;
    private UserProfileDto userProfile;
}