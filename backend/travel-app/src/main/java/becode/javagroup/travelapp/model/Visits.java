package becode.javagroup.travelapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "visits")
@Data
@NoArgsConstructor
@AllArgsConstructor


public class Visits {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String visitType;

    @Column(name = "name")
    private String visitName;

    @Column(name = "price")
    private double visitPrice;

    @Column(name = "address")
    private String visitAddress;

    @Column(name = "arrival_time")
    private LocalDateTime visitArrival;

    @Column(name = "description")
    private String visitDescription;
}