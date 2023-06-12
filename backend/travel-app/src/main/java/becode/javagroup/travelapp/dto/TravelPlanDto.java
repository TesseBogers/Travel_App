package becode.javagroup.travelapp.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TravelPlanDto {
    private Long id;
    private String destination;
    private String startDate;
    private String endDate;
    private Long userId;
}
