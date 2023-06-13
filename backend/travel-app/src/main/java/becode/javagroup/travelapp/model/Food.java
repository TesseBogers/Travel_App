package becode.javagroup.travelapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "food")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String foodType;

    @Column(name = "name")
    private String foodName;

    @Column(name = "price")
    private double foodPrice;

    @Column(name = "address")
    private String foodAddress;

    @Column(name = "description")
    private String foodDescription;
}