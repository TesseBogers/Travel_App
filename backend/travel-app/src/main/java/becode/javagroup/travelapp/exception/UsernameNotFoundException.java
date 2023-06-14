package becode.javagroup.travelapp.exception;

/**
 * Exception thrown when a username is not found in the database.
 * This exception extends the RuntimeException class, making it an unchecked exception.
 */
public class UsernameNotFoundException extends RuntimeException {
    /**
     * Constructs a new UsernameNotFoundException with the specified detail message.
     *
     * @param message the detail message describing the exception
     */
    public UsernameNotFoundException(String message) {
        super(message);
    }
}
