package becode.javagroup.travelapp.repository;

import becode.javagroup.travelapp.model.TravelPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelPlanRepository extends JpaRepository<TravelPlan, Long> {
}
