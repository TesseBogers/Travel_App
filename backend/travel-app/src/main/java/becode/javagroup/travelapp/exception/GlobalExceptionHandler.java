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
 * This class is annotated with the @ControllerAdvice annotation, which makes it a global exception handler.
 * @see ControllerAdvice
 * @see <a href="https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/ControllerAdvice.html">ControllerAdvice</a>
 * @see <a href="https://en.wikipedia.org/wiki/SOLID">SOLID</a>
 * @see <a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself">DRY</a>
 * @see <a href="https://en.wikipedia.org/wiki/KISS_principle">KISS</a>
 * @see <a href="https://en.wikipedia.org/wiki/GRASP_(object-oriented_design)#High_cohesion">High cohesion</a>
 * @see <a href="https://en.wikipedia.org/wiki/GRASP_(object-oriented_design)#Low_coupling">Low coupling</a>
 *
 */
@ControllerAdvice
public class GlobalExceptionHandler {
    /**
     * The logger for this class.
     * @see <a href="https://www.slf4j.org/">SLF4J</a>
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Handles the UserNotFoundException.
     * Returns a 409 Conflict status code. This is a client error, meaning the user did something wrong.
     * @param exception the exception to handle
     *                  @see <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409">409 Conflict</a>
     *                  @see UserNotFoundException
     * @see <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">HTTP status codes</a>
     * @see Exception
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserNotFoundException.class)
    public void handleUserNotFoundException(UserNotFoundException exception) {
        LOGGER.error("User not found", exception);
    }

    /**
     * Handles the DuplicateUserException. Also returns a 409 Conflict status code.
     * @param exception the exception to handle
     * @see DuplicateUserException
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(DuplicateUserException.class)
    public void handleDuplicateUserException(DuplicateUserException exception) {
        LOGGER.error("Duplicate user", exception);
    }

    /**
     * Handles the PermissionNotFoundException. Also returns a 409 Conflict status code.
     * @param exception the exception to handle
     * @see PermissionNotFoundException
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(PermissionNotFoundException.class)
    public void handlePermissionNotFoundException(PermissionNotFoundException exception) {
        LOGGER.error("Permission not found", exception);
    }

    /**
     * Handles the RoleNotFoundException. Also returns a 409 Conflict status code.
     * @param exception the exception to handle
     * @see RoleNotFoundException
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(RoleNotFoundException.class)
    public void handleRoleNotFoundException(RoleNotFoundException exception) {
        LOGGER.error("Role not found", exception);
    }

    /**
     * Handles the UsernameNotFoundException. Also returns a 409 Conflict status code.
     * @param exception the exception to handle
     * @see UsernameNotFoundException
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UsernameNotFoundException.class)
    public void handleUsernameNotFoundException(UsernameNotFoundException exception) {
        LOGGER.error("Username not found", exception);
    }

    /**
     * Handles the InvalidPasswordException. Also returns a 409 Conflict status code.
     * @param exception the exception to handle
     * @see InvalidPasswordException
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(InvalidPasswordException.class)
    public void handleInvalidPasswordException(InvalidPasswordException exception) {
        LOGGER.error("Invalid password", exception);
    }

    /**
     * Handles the InvalidEmailException. Also returns a 409 Conflict status code.
     * @param exception the exception to handle
     * @see InvalidEmailException
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(InvalidEmailException.class)
    public void handleInvalidEmailException(InvalidEmailException exception) {
        LOGGER.error("Invalid email", exception);
    }

    /**
     * Handles the UserNotFoundException. Also returns a 409 Conflict status code.
     * @param exception the exception to handle
     * @see UserNotFoundWithEmailException
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserNotFoundWithEmailException.class)
    public void handleUserNotFoundWithEmailException(UserNotFoundWithEmailException exception) {
        LOGGER.error("User with email not found", exception);
    }

    /**
     * Handle generic Exception. Returns a 500 Internal Server Error status code.
     * @param exception The exception to handle
     *                  @see <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500">500 Internal Server Error</a>
     *                  @see Exception named as GeneralException
     */
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public void handleGeneralException(Exception exception) {
        LOGGER.error("Internal server error: ", exception);
    }
}