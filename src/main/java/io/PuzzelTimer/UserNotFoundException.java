package io.PuzzelTimer;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by meyerhallot on 4/23/17.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String userId) {
        super("could not find user '"+ userId +"'.");
    }
}
