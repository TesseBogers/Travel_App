package becode.javagroup.travelapp.exception;

/**
 * Exception thrown when a user is not found in the database.
 * This exception extends the RuntimeException class, making it an unchecked exception.
 */
public class UserNotFoundException extends RuntimeException {
    /**
     * Constructs a new UserNotFoundException with the specified detail message.
     *
     * @param message the detail message describing the exception
     */
    public UserNotFoundException(String message) {
        super(message);
    }
}
