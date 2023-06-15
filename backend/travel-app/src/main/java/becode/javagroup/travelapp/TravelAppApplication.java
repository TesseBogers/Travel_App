package becode.javagroup.travelapp;

import becode.javagroup.travelapp.service.RolePermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class TravelAppApplication {

    private final RolePermissionService rolePermissionService;

    @Autowired
    public TravelAppApplication(RolePermissionService rolePermissionService) {
        this.rolePermissionService = rolePermissionService;
    }

    public static void main(String[] args) {
        SpringApplication.run(TravelAppApplication.class, args);
    }

    @PostConstruct
    public void initRolesAndPermissions() {
        rolePermissionService.initRolesAndPermissions();
    }
}