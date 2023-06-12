package becode.javagroup.travelapp.exception;

/**
 * Exception thrown when an invalid email address is encountered.
 * This exception extends the RuntimeException class, making it an unchecked exception.
 */
public class InvalidEmailException extends RuntimeException {

    /**
     * Constructs a new InvalidEmailException with the specified detail message.
     *
     * @param message the detail message describing the exception
     */
    public InvalidEmailException(String message) {
        super(message);
    }
}
