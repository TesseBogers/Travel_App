package becode.javagroup.travelapp.exception;

public class UserProfileNotFoundException extends RuntimeException {

        public UserProfileNotFoundException(String id) {
            super("Could not find user profile with ID " + id);
        }
}
