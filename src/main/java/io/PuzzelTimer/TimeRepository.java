package io.PuzzelTimer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

/**
 * Created by meyerhallot on 4/23/17.
 */
public interface TimeRepository extends JpaRepository<Time, Long> {
    Collection<Time> findByAccountUsername(String username);
}