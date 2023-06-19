package becode.javagroup.travelapp.model;

import lombok.*;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

/**
 * This class represents a travel plan. It is annotated with JPA annotations to allow it to be mapped to a database for persistence.
 */
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "travel_plans")
public class TravelPlan {

    /**
     * The id is a unique identifier for this travel plan.
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
     * The field destination is a String that represents the destination of the travel plan. It is a required field, hence cannot be null or empty or blank.
     */
    @Column(name = "destination", nullable = false)
    private String destination;

    /**
     * The field startDate is a LocalDate that represents the start date of the travel plan. It is a required field, hence cannot be null.
     */
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    /**
     * The field endDate is a LocalDate that represents the end date of the travel plan. It is a required field, hence cannot be null.
     */
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    /**
     * The field user is a User object that represents the user that created the travel plan. It is a required field, hence cannot be null.
     * @see ManyToOne
     * @see JoinColumn
     * @see User
     */
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public void setId(Long id) {
        this.id = id;
    }
}