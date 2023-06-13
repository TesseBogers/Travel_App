package becode.javagroup.travelapp.controller;

import becode.javagroup.travelapp.dto.TravelPlanDto;
import becode.javagroup.travelapp.service.TravelPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing travel plans.
 * This class delegates the business logic to the TravelPlanService.
 */
@RestController
@RequestMapping("/api/travelplans")
@RequiredArgsConstructor
public class TravelPlanController {

    private final TravelPlanService travelPlanService;

    /**
     * Retrieves all travel plans.
     *
     * @return A response entity containing a list of all travel plans.
     */
    @GetMapping
    public ResponseEntity<List<TravelPlanDto>> getAllTravelPlans() {
        return ResponseEntity.ok(travelPlanService.getAllTravelPlans());
    }

    /**
     * Retrieves a specific travel plan by its ID.
     *
     * @param id The ID of the travel plan to retrieve.
     * @return A response entity containing the requested travel plan.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TravelPlanDto> getTravelPlan(@PathVariable Long id) {
        return ResponseEntity.ok(travelPlanService.getTravelPlan(id));
    }

    /**
     * Creates a new travel plan.
     *
     * @param travelPlanDto The travel plan data to create a new travel plan from.
     * @return A response entity containing the created travel plan.
     */
    @PostMapping
    public ResponseEntity<TravelPlanDto> createTravelPlan(@RequestBody TravelPlanDto travelPlanDto) {
        return ResponseEntity.ok(travelPlanService.createTravelPlan(travelPlanDto));
    }

    /**
     * Updates a specific travel plan by its ID.
     *
     * @param id            The ID of the travel plan to update.
     * @param travelPlanDto The travel plan data to update the travel plan with.
     * @return A response entity containing the updated travel plan.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TravelPlanDto> updateTravelPlan(@PathVariable Long id, @RequestBody TravelPlanDto travelPlanDto) {
        return ResponseEntity.ok(travelPlanService.updateTravelPlan(id, travelPlanDto));
    }

    /**
     * Deletes a specific travel plan by its ID.
     *
     * @param id The ID of the travel plan to delete.
     * @return A response entity indicating success (HTTP 200).
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTravelPlan(@PathVariable Long id) {
        travelPlanService.deleteTravelPlan(id);
        return ResponseEntity.ok().build();
    }
}