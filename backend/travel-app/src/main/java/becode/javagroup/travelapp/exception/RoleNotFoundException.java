package becode.javagroup.travelapp.exception;

/**
 * Exception thrown when a role is not found in the database.
 * This exception extends the RuntimeException class, making it an unchecked exception.
 */
public class RoleNotFoundException extends RuntimeException {
    /**
     * Constructs a new RoleNotFoundException with the specified detail message.
     *
     * @param message the detail message describing the exception
     */
    public RoleNotFoundException(String message) {
        super(message);
    }
}
