package becode.javagroup.travelapp.controller;

import becode.javagroup.travelapp.model.TravelPlan;
import becode.javagroup.travelapp.repository.TravelPlanRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/travelplans")
@RequiredArgsConstructor
public class TravelPlanController {
    private final TravelPlanRepository travelPlanRepository;

    @GetMapping
    public List<TravelPlan> getAllTravelPlans() {
        return travelPlanRepository.findAll();
    }

    @PostMapping
    public TravelPlan createTravelPlan(@Valid @RequestBody TravelPlan travelPlan) {
        return travelPlanRepository.save(travelPlan);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TravelPlan> getTravelPlanById(@PathVariable(value = "id") Long travelPlanId) {
        Optional<TravelPlan> travelPlan = travelPlanRepository.findById(travelPlanId);
        return travelPlan.map(plan -> ResponseEntity.ok().body(plan)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TravelPlan> updateTravelPlan(@PathVariable(value = "id") Long travelPlanId, @Valid @RequestBody TravelPlan travelPlanDetails) {
        Optional<TravelPlan> travelPlan = travelPlanRepository.findById(travelPlanId);
        if (travelPlan.isPresent()) {
            TravelPlan updatedTravelPlan = travelPlan.get();
            updatedTravelPlan.setDestination(travelPlanDetails.getDestination());
            updatedTravelPlan.setStartDate(travelPlanDetails.getStartDate());
            updatedTravelPlan.setEndDate(travelPlanDetails.getEndDate());
            updatedTravelPlan.setUser(travelPlanDetails.getUser());
            travelPlanRepository.save(updatedTravelPlan);
            return ResponseEntity.ok(updatedTravelPlan);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTravelPlan(@PathVariable(value = "id") Long travelPlanId) {
        Optional<TravelPlan> travelPlan = travelPlanRepository.findById(travelPlanId);
        if (travelPlan.isPresent()) {
            travelPlanRepository.delete(travelPlan.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
