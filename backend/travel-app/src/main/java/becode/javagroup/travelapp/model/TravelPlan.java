package becode.javagroup.travelapp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.*;
import jakarta.persistence.*;

import java.time.LocalDate;

/**
 * A TravelPlan class to represent the travel plans of a user in the system.
 * This class is annotated with the @Entity annotation, which makes it a JPA entity.
 * It is also annotated with @Data, @Builder, @AllArgsConstructor, @NoArgsConstructor.
 * These annotations are provided by the Lombok library and reduce boilerplate code.
 * @see Entity
 * @see <a href="https://www.baeldung.com/intro-to-project-lombok">Lombok</a>
 * @see <a href="https://www.baeldung.com/jpa-entity-table">Table</a>
 */
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "travel_plans")
public class TravelPlan {

    /**
     * The id of this travel plan.
     * @see Id
     * @see GeneratedValue
     * @see GenerationType
     * @see Setter
     * @see AccessLevel
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    /**
     * The destination of this travel plan.
     * @see NotNull
     * @see NotEmpty
     * @see Column
     */
    @NotNull(message = "Destination cannot be null")
    @NotEmpty(message = "Destination cannot be empty")
    @Column(name = "destination", nullable = false)
    private String destination;

    /**
     * The start date of this travel plan.
     * @see JsonFormat
     * @see PastOrPresent
     * @see Column
     */
    @JsonFormat(pattern = "dd-MM-yyyy")
    @PastOrPresent(message = "Start date cannot be in the future")
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    /**
     * The end date of this travel plan.
     * @see FutureOrPresent
     * @see Column
     */
    @FutureOrPresent(message = "End date cannot be in the past")
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    /**
     * The user associated with this travel plan.
     * @see ManyToOne
     * @see JoinColumn
     * @see User
     */
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}