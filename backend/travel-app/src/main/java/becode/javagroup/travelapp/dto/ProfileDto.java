package becode.javagroup.travelapp.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
    private Long id;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String country;
    private String preferredLanguage;
    private String preferredCurrency;
    private Long userId;
}
