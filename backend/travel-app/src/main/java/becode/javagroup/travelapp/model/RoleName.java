package becode.javagroup.travelapp.model;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * Enum for the different role names.
 * This enum is used to define the roles in the database.
 */
public enum RoleName {
    ROLE_USER("ROLE_USER"),
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_MODERATOR("ROLE_MODERATOR"),
    ROLE_TRAVELER("ROLE_TRAVELER");

    private final String value;

    RoleName(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}