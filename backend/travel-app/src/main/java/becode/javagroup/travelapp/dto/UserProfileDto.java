package becode.javagroup.travelapp.dto;

import lombok.*;

import java.time.LocalDate;

/**
 * Data Transfer Object for User Profile information.
 */
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {

    /** The ID of the user profile. */
    private Long id;

    /** The first name of the user. */
    private String firstName;

    /** The last name of the user. */
    private String lastName;

    /** The date of birth of the user. */
    private LocalDate dateOfBirth;

    /** The country of the user. */
    private String country;

    /** The preferred language of the user. */
    private String preferredLanguage;

    /** The preferred currency of the user. */
    private String preferredCurrency;
}