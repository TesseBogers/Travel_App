package becode.javagroup.travelapp.controller;

import becode.javagroup.travelapp.dto.UserProfileDto;
import becode.javagroup.travelapp.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing user profiles.
 * This class delegates the business logic to the UserProfileService.
 */
@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserProfileController {

    private final UserProfileService userProfileService;

    /**
     * Retrieves all user profiles.
     *
     * @return A response entity containing a list of all user profiles.
     */
    @GetMapping
    public ResponseEntity<List<UserProfileDto>> getAllProfiles() {
        return ResponseEntity.ok(userProfileService.getAllProfiles());
    }

    /**
     * Retrieves a specific user profile by its ID.
     *
     * @param id The ID of the user profile to retrieve.
     * @return A response entity containing the requested user profile.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserProfileDto> getProfile(@PathVariable Long id) {
        return ResponseEntity.ok(userProfileService.getProfile(id));
    }

    /**
     * Creates a new user profile.
     *
     * @param userId The ID of the user for the new profile.
     * @param userProfileDto The user profile data to create a new profile from.
     * @return A response entity containing the created user profile.
     */
    @PostMapping("/{userId}")
    public ResponseEntity<UserProfileDto> createProfile(@PathVariable Long userId, @RequestBody UserProfileDto userProfileDto) {
        return ResponseEntity.ok(userProfileService.createProfile(userProfileDto, userId));
    }

    /**
     * Updates a specific user profile by its ID.
     *
     * @param id             The ID of the user profile to update.
     * @param userId         The ID of the user for the profile.
     * @param userProfileDto The user profile data to update the profile with.
     * @return A response entity containing the updated user profile.
     */
    @PutMapping("/{id}/{userId}")
    public ResponseEntity<UserProfileDto> updateProfile(@PathVariable Long id, @PathVariable Long userId, @RequestBody UserProfileDto userProfileDto) {
        return ResponseEntity.ok(userProfileService.updateProfile(id, userProfileDto, userId));
    }

    /**
     * Deletes a specific user profile by its ID.
     *
     * @param id The ID of the user profile to delete.
     * @return A response entity indicating success (HTTP 200).
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        userProfileService.deleteProfile(id);
        return ResponseEntity.ok().build();
    }
}