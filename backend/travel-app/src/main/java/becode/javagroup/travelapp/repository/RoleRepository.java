package becode.javagroup.travelapp.repository;

import becode.javagroup.travelapp.model.Role;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);

    Set<Role> findByPermissionsName(@NotBlank String permissions_name);

    Set<Role> findByNameIn(Set<String> name);
}