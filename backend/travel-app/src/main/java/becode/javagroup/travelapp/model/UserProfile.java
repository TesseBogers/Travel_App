package becode.javagroup.travelapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"user"})
@ToString(exclude = {"user"})
@Table(name = "profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @NotBlank
    @Column(name = "first_name")
    private String firstName;

    @NotBlank
    @Column(name = "last_name")
    private String lastName;

    @Past
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "country")
    private String country;

    @Column(name = "preferred_language")
    private String preferredLanguage;

    @Column(name = "preferred_currency")
    private String preferredCurrency;

    @OneToOne(mappedBy = "userProfile")
    @JsonBackReference
    private User user;
}