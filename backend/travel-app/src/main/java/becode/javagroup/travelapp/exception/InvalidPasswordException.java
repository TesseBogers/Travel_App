package becode.javagroup.travelapp.exception;

/**
 * Exception thrown when an invalid password is encountered.
 * This exception extends the RuntimeException class, making it an unchecked exception.
 */
public class InvalidPasswordException extends RuntimeException {
    /**
     * Constructs a new InvalidPasswordException with the specified detail message.
     *
     * @param message the detail message describing the exception
     */
    public InvalidPasswordException(String message) {
        super(message);
    }
}
