package becode.javagroup.travelapp.exception;

/**
 * Exception thrown when a user already exists in the database.
 * This exception extends the RuntimeException class, making it an unchecked exception.
 * @see RuntimeException
 * @see <a href="https://docs.oracle.com/javase/8/docs/api/java/lang/RuntimeException.html">RuntimeException</a>
 * @see <a href="https://docs.oracle.com/javase/tutorial/essential/exceptions/runtime.html">Unchecked Exceptions — The Controversy</a>
 */
public class DuplicateUserException extends RuntimeException {
    /**
     * Constructs a new DuplicateUserException with the specified detail message.
     *
     * @param message the detail message describing the exception
     *
     */
    public DuplicateUserException(String message) {
        super(message);
    }
}