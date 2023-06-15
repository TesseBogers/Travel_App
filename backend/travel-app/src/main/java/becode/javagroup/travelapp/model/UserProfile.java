package becode.javagroup.travelapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

/**
 * A UserProfile class to represent the userProfile of a user in the system.
 * This class is annotated with the @Entity annotation, which makes it a JPA entity.
 * It is also annotated with @Data, @Builder, @AllArgsConstructor, @NoArgsConstructor, @EqualsAndHashCode and @ToString.
 * These annotations are provided by the Lombok library and reduce boilerplate code.
 * The @EqualsAndHashCode and @ToString are also lombok annotations to exclude the user field to prevent circular references.
 * @see Entity
 * @see <a href="https://www.baeldung.com/intro-to-project-lombok">Lombok</a>
 * @see EqualsAndHashCode & <a href="https://projectlombok.org/features/EqualsAndHashCode">EqualsAndHashCode</a>
 * @see ToString & <a href="https://projectlombok.org/features/ToString">ToString</a>
 * @see <a href="https://www.baeldung.com/jpa-entity-table">Table</a>
 * @see <a href="https://www.baeldung.com/jackson-bidirectional-relationships-and-infinite-recursion">circular references</a>
 */
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"user"})
@ToString(exclude = {"user"})
@Table(name = "profiles")
public class UserProfile {

    /**
     * The id of this userProfile.
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
     * The first name associated with this userProfile.
     * @see NotBlank
     * @see Column
     */
    @NotBlank
    @Column(name = "first_name")
    private String firstName;

    /**
     * The last name associated with this userProfile.
     * @see NotBlank
     * @see Column
     */
    @NotBlank
    @Column(name = "last_name")
    private String lastName;

    /**
     * The date of birth associated with this userProfile.
     * @see Past
     * @see Column
     */
    @Past
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    /**
     * The country associated with this userProfile.
     * @see Column
     */
    @Column(name = "country")
    private String country;

    /**
     * The preferred language associated with this userProfile.
     * @see Column
     */
    @Column(name = "preferred_language")
    private String preferredLanguage;

    /**
     * The preferred currency associated with this userProfile.
     * @see Column
     */
    @Column(name = "preferred_currency")
    private String preferredCurrency;

    /**
     * The user associated with this userProfile.
     * @see OneToOne
     * @see User
     */
    @OneToOne(mappedBy = "userProfile")
    @JsonBackReference
    private User user;
}