package becode.javagroup.travelapp.repository;

import becode.javagroup.travelapp.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * UserProfileRepository is a repository interface that extends JpaRepository.
 * The JpaRepository interface provides methods for performing CRUD operations on the UserProfile entity.
 * The methods in this interface are implemented by Spring Data JPA, allowing use without having to write any code.
 */
@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
}
