package io.PuzzelTimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collection;

/**<
 * Created by meyerhallot on 4/23/17.
 */
@RestController
@RequestMapping("/users/user/{userId}/times")
class TimeRestController {

    private final TimeRepository timeRepository;

    private final AccountRepository accountRepository;

    @Autowired
    TimeRestController(TimeRepository timeRepository,
                       AccountRepository accountRepository) {
        this.timeRepository = timeRepository;
        this.accountRepository = accountRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    Collection<Time> readTimes(@PathVariable String userId) {
        this.validateUser(userId);
        return this.timeRepository.findByAccountUsername(userId);
    }

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> add(@PathVariable String userId, @RequestBody Time input) {
        this.validateUser(userId);

        return this.accountRepository
                .findByUsername(userId)
                .map(account -> {
                    Time result = timeRepository.save(new Time(account,
                            input.time, input.description));

                    URI location = ServletUriComponentsBuilder
                            .fromCurrentRequest().path("/{id}")
                            .buildAndExpand(result.getId()).toUri();

                    return ResponseEntity.created(location).build();
                })
                .orElse(ResponseEntity.noContent().build());

    }

    @RequestMapping(method = RequestMethod.GET, value = "/{timeId}")
    Time readTime(@PathVariable String userId, @PathVariable Long timeId) {
        this.validateUser(userId);
        return this.timeRepository.findOne(timeId);
    }

    private void validateUser(String userId) {
        this.accountRepository.findByUsername(userId).orElseThrow(
                () -> new UserNotFoundException(userId));
    }
}
