package becode.javagroup.travelapp.exception;

/**
 * Exception thrown when a permission is not found in the database.
 * This exception extends the RuntimeException class, making it an unchecked exception.
 */
public class PermissionNotFoundException extends RuntimeException {
    /**
     * Constructs a new PermissionNotFoundException with the specified detail message.
     *
     * @param message the detail message describing the exception
     */
    public PermissionNotFoundException(String message) {
        super(message);
    }
}