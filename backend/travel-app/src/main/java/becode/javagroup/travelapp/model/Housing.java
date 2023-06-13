package becode.javagroup.travelapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Table(name = "housing")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Housing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String housingType;

    @Column(name = "name")
    private String housingName;

    @Column(name = "price")
    private double housingPrice;

    @Column(name = "address")
    private String housingAddress;

    @Column(name = "arrival_time")
    private LocalTime housingArrival;

    @Column(name = "description")
    private String housingDescription;
}