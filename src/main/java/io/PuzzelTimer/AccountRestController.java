package io.PuzzelTimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.json.JsonContent;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.cert.PKIXRevocationChecker;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
/**
 * Created by meyerhallot on 4/23/17.
 */

//curl post request
// curl -X POST --data '{"username":"bepis", "password":"xyz"}' -H "Content-Type:application/json" http://localhost:8080/users/add

@RestController
@RequestMapping("/users")
public class AccountRestController {


    private final AccountRepository accountRepository;

    @Autowired
    AccountRestController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    //Read Account
    @RequestMapping(method = RequestMethod.GET, value = "/user/{userId}")
    Optional<Account> readAccount(@PathVariable String userId) {
        this.validateUser(userId);
        return this.accountRepository.findByUsername(userId);
    }



    @RequestMapping(method = RequestMethod.GET, value = "/all")
    List<Account> readAll(){
        return this.accountRepository.findAll();
    }

    //Adds new user
    @RequestMapping(method = RequestMethod.POST, value = "/add", produces = { MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> add(@RequestBody Account input) { //@RequestParam("userName") String userName, @RequestParam("password") String password
        System.out.println("Username: " + input.getUsername());
        System.out.println("Password: " + input.getPassword());
        Account result = accountRepository.save(new Account (input.getUsername(), input.getPassword()));
        System.out.println("Result Username: " + result.getUsername());
        System.out.println("Result Password: " + result.getPassword() + "\n");

        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    //Validates that the username exists
    private void validateUser(String userId) {
        this.accountRepository.findByUsername(userId).orElseThrow(
                () -> new UserNotFoundException(userId));
    }
}
