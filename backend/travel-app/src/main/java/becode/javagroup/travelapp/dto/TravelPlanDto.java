package becode.javagroup.travelapp.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

/**
 * This class represents a Data Transfer Object (DTO) for a travel plan. It is used for transferring travel plan data between different layers or components of the application.
 * It contains the necessary fields to represent a travel plan and is annotated with validation and formatting annotations for data integrity and consistency.
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TravelPlanDto {
    /**
     * The id is a unique identifier for this travel plan.
     */
    private Long id;

    /**
     * The field destination is a String that represents the destination of the travel plan. It is a required field and cannot be blank.
     * @see NotBlank
     */
    @NotBlank(message = "Destination cannot be blank")
    private String destination;

    /**
     * The field startDate is a LocalDate that represents the start date of the travel plan. It is a required field and cannot be null.
     * @see NotNull
     * @see DateTimeFormat
     */
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @NotNull(message = "Start date cannot be null")
    private LocalDate startDate;

    /**
     * The field endDate is a LocalDate that represents the end date of the travel plan. It is a required field and cannot be null.
     * Additionally, it must be a future date or the current date.
     * @see NotNull
     * @see DateTimeFormat
     * @see FutureOrPresent
     */
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @FutureOrPresent(message = "End date cannot be in the future")
    @NotNull(message = "End date cannot be null")
    private LocalDate endDate;

    /**
     * The field userId is a Long that represents the ID of the user who created the travel plan. It is a required field and cannot be null.
     */
    @NotNull(message = "User ID cannot be null")
    private Long userId;
}