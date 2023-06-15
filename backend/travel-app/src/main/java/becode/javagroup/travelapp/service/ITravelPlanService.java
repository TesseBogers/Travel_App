package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.dto.TravelPlanDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ITravelPlanService {
    List<TravelPlanDto> getAllTravelPlans();
    ResponseEntity<TravelPlanDto> getTravelPlan(Long id);
    TravelPlanDto createTravelPlan(TravelPlanDto travelPlanDto);
    TravelPlanDto updateTravelPlan(Long id, TravelPlanDto travelPlanDto);
    void deleteTravelPlan(Long id);
}