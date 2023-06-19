package becode.javagroup.travelapp;

import becode.javagroup.travelapp.service.RolePermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.annotation.PostConstruct;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor
public class TravelAppApplication {

    private final RolePermissionService rolePermissionService;


    public static void main(String[] args) {
        SpringApplication.run(TravelAppApplication.class, args);
    }

    @PostConstruct
    public void initRolesAndPermissions() {
        rolePermissionService.initRolesAndPermissions();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}