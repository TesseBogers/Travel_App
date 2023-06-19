package becode.javagroup.travelapp.dto;

import becode.javagroup.travelapp.model.User;
import becode.javagroup.travelapp.model.Role;
import becode.javagroup.travelapp.model.UserProfile;
import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
public class UserResponseDto {
    private Long id;
    private String username;
    private String email;
    private Set<String> roles;
    private UserProfileDto userProfile;

    public UserResponseDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.roles = user.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet());
        this.userProfile = mapToDto(user.getUserProfile());
    }

    private UserProfileDto mapToDto(UserProfile userProfile) {
        if (userProfile == null) {
            return null;
        }

        return getUserProfileDto(userProfile);
    }

    @NotNull
    public static UserProfileDto getUserProfileDto(UserProfile userProfile) {
        UserProfileDto userProfileDto = new UserProfileDto();
        userProfileDto.setId(userProfile.getId());
        userProfileDto.setFirstName(userProfile.getFirstName());
        userProfileDto.setLastName(userProfile.getLastName());
        userProfileDto.setDateOfBirth(userProfile.getDateOfBirth());
        userProfileDto.setCountry(userProfile.getCountry());
        userProfileDto.setPreferredLanguage(userProfile.getPreferredLanguage());
        userProfileDto.setPreferredCurrency(userProfile.getPreferredCurrency());

        return userProfileDto;
    }
}