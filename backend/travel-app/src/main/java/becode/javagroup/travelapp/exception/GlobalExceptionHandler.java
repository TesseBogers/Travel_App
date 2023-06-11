package becode.javagroup.travelapp.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * A Global Exception Handler class to handle all the exceptions.
 * Follows the SOLID, DRY, KISS principles and promotes high cohesion and low coupling.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Handles the UserNotFoundException.
     * @param exception the exception to handle
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserNotFoundException.class)
    public void handleUserNotFoundException(UserNotFoundException exception) {
        LOGGER.error("User not found", exception);
    }

    /**
     * Handles the DuplicateUserException.
     * @param exception the exception to handle
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(DuplicateUserException.class)
    public void handleDuplicateUserException(DuplicateUserException exception) {
        LOGGER.error("Duplicate user", exception);
    }

    /**
     * Handles the PermissionNotFoundException.
     * @param exception the exception to handle
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(PermissionNotFoundException.class)
    public void handlePermissionNotFoundException(PermissionNotFoundException exception) {
        LOGGER.error("Permission not found", exception);
    }

    /**
     * Handles the RoleNotFoundException.
     * @param exception the exception to handle
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(RoleNotFoundException.class)
    public void handleRoleNotFoundException(RoleNotFoundException exception) {
        LOGGER.error("Role not found", exception);
    }

    /**
     * Handles the UsernameNotFoundException.
     * @param exception the exception to handle
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UsernameNotFoundException.class)
    public void handleUsernameNotFoundException(UsernameNotFoundException exception) {
        LOGGER.error("Username not found", exception);
    }

    /**
     * Handles the InvalidPasswordException.
     * @param exception the exception to handle
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(InvalidPasswordException.class)
    public void handleInvalidPasswordException(InvalidPasswordException exception) {
        LOGGER.error("Invalid password", exception);
    }

    /**
     * Handles the InvalidEmailException.
     * @param exception the exception to handle
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(InvalidEmailException.class)
    public void handleInvalidEmailException(InvalidEmailException exception) {
        LOGGER.error("Invalid email", exception);
    }

    /**
     * Handles the UserNotFoundException.
     * @param exception the exception to handle
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserNotFoundWithEmailException.class)
    public void handleUserNotFoundWithEmailException(UserNotFoundWithEmailException exception) {
        LOGGER.error("User with email not found", exception);
    }

    /**
     * Handle generic Exception.
     * @param exception The exception to handle
     */
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public void handleGeneralException(Exception exception) {
        LOGGER.error("Internal server error: ", exception);
    }
}