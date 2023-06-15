package becode.javagroup.travelapp.model;

/**
 * Enum for the different permission names.
 * This enum is used to define the permissions in the database.
 */
public enum PermissionName {
    PERMISSION_ALL("PERMISSION_ALL"),
    PERMISSION_CREATE("PERMISSION_CREATE"),
    PERMISSION_DELETE("PERMISSION_DELETE"),
    PERMISSION_READ("PERMISSION_READ"),
    PERMISSION_UPDATE("PERMISSION_UPDATE");

    private final String value;

    PermissionName(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}
