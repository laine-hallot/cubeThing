package io.PuzzelTimer;

/**
 * Created by meyerhallot on 4/23/17.
 */

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUsername(String username);
}
