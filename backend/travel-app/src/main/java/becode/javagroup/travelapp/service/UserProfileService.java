package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.dto.UserProfileDto;
import becode.javagroup.travelapp.model.UserProfile;
import becode.javagroup.travelapp.model.User;
import becode.javagroup.travelapp.repository.UserProfileRepository;
import becode.javagroup.travelapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static becode.javagroup.travelapp.dto.UserResponseDto.getUserProfileDto;

/**
 * Service class for handling operations related to UserProfile.
 * It uses the UserProfileRepository to interact with the underlying data store.
 * All operations are performed within a transactional context.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;

    /**
     * Retrieve all profiles.
     *
     * @return List of UserProfileDto.
     */
    public List<UserProfileDto> getAllProfiles() {
        return userProfileRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Retrieve a userProfile by its id.
     *
     * @param id The id of the userProfile.
     * @return UserProfileDto.
     */
    public UserProfileDto getProfile(Long id) {
        UserProfile userProfile = findProfileOrThrow(id);
        return convertToDto(userProfile);
    }

    /**
     * Create a new userProfile.
     *
     * @param userProfileDto The UserProfileDto.
     * @param userId The Id of the User.
     * @return The created UserProfileDto.
     */
    public UserProfileDto createProfile(UserProfileDto userProfileDto, Long userId) {
        UserProfile userProfile = convertToEntity(userProfileDto, userId);
        userProfile = userProfileRepository.save(userProfile);
        return convertToDto(userProfile);
    }

    /**
     * Update an existing userProfile.
     *
     * @param id The id of the userProfile.
     * @param userProfileDto The UserProfileDto with updated data.
     * @param userId The Id of the User.
     * @return The updated UserProfileDto.
     */
    public UserProfileDto updateProfile(Long id, UserProfileDto userProfileDto, Long userId) {
        UserProfile userProfile = findProfileOrThrow(id);
        updateProfileData(userProfile, userProfileDto, userId);
        userProfile = userProfileRepository.save(userProfile);
        return convertToDto(userProfile);
    }

    /**
     * Delete a userProfile.
     *
     * @param id The id of the userProfile.
     */
    public void deleteProfile(Long id) {
        UserProfile userProfile = findProfileOrThrow(id);
        userProfileRepository.delete(userProfile);
    }

    /**
     * Convert a UserProfile to a UserProfileDto.
     *
     * @param userProfile The UserProfile.
     * @return The corresponding UserProfileDto.
     */
    private UserProfileDto convertToDto(UserProfile userProfile) {
        return getUserProfileDto(userProfile);
    }

    /**
     * Convert a UserProfileDto to a UserProfile.
     *
     * @param userProfileDto The UserProfileDto.
     * @return The corresponding UserProfile.
     */
    private UserProfile convertToEntity(UserProfileDto userProfileDto, Long userId) {
        UserProfile userProfile = new UserProfile();
        updateProfileData(userProfile, userProfileDto, userId);
        return userProfile;
    }

    /**
     * Update the data of a userProfile from a UserProfileDto.
     *
     * @param userProfileDto The UserProfileDto with the new data.
     */
    private void updateProfileData(UserProfile userProfile, UserProfileDto userProfileDto, Long userId) {
        userProfile.setFirstName(userProfileDto.getFirstName());
        userProfile.setLastName(userProfileDto.getLastName());
        userProfile.setDateOfBirth(userProfileDto.getDateOfBirth());
        userProfile.setCountry(userProfileDto.getCountry());
        userProfile.setPreferredLanguage(userProfileDto.getPreferredLanguage());
        userProfile.setPreferredCurrency(userProfileDto.getPreferredCurrency());
        userProfile.setUser(findUserOrThrow(userId));
    }

    /**
     * Retrieve a userProfile by its id or throw an exception.
     *
     * @param id The id of the userProfile.
     * @return The UserProfile.
     */
    private UserProfile findProfileOrThrow(Long id) {
        return userProfileRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid userProfile Id:" + id));
    }

    /**
     * Retrieve a user by its id or throw an exception.
     *
     * @param id The id of the user.
     * @return The User.
     */
    private User findUserOrThrow(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }
}