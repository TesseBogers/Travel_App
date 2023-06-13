package becode.javagroup.travelapp.repository;

import becode.javagroup.travelapp.model.Visits;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitsRepository extends JpaRepository<Visits, Long> {
}

