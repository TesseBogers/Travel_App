package becode.javagroup.travelapp.repository;

import becode.javagroup.travelapp.model.TravelPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * TravelPlanRepository is a repository interface that extends JpaRepository.
 * The JpaRepository interface provides methods for performing CRUD operations on the TravelPlan entity.
 * The methods in this interface are implemented by Spring Data JPA, allowing us to use them without having to write any code.
 * The @Repository annotation is used to indicate that this interface is a repository.
 * @see JpaRepository
 * @see <a href="https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation">Query Creation</a>
 */
@Repository
public interface TravelPlanRepository extends JpaRepository<TravelPlan, Long> {
}