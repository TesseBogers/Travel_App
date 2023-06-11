package becode.javagroup.travelapp.exception;

public class UserNotFoundWithEmailException extends RuntimeException {
    public UserNotFoundWithEmailException(String message) {
        super(message);
    }
}
