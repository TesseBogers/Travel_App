package becode.javagroup.travelapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "transportation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transportation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String transportationType;

    @Column(name = "name")
    private String transportationName;

    @Column(name = "price")
    private double transportationPrice;

    @Column(name = "departure_place")
    private String transportationDeparture;

    @Column(name = "arrival_place")
    private String transportationArrival;

    @Column(name = "arrival_time")
    private LocalDateTime transportationArrivalTime;

    @Column(name = "departure_time")
    private LocalDateTime transportationDepartureTime;

    @Column(name = "description")
    private String transportationDescription;
}