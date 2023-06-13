package becode.javagroup.travelapp.repository;

import becode.javagroup.travelapp.model.Housing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HousingRepository extends JpaRepository<Housing, Long> {
}
