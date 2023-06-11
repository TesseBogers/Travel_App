package becode.javagroup.travelapp.repository;

import becode.javagroup.travelapp.model.Permission;
import becode.javagroup.travelapp.model.PermissionName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Optional<Permission> findByName(String name);
}