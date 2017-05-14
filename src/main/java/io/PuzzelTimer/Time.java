package io.PuzzelTimer;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * Created by meyerhallot on 4/23/17.
 */
@Entity
public class Time {

    @JsonIgnore
    @ManyToOne
    private Account account;

    @Id
    @GeneratedValue
    private Long id;

    public String time;
    public String description;

    Time() { // jpa only
    }

    public Time(Account account, String time, String description) {
        this.time = time;
        this.description = description;
        this.account = account;
    }


    public Account getAccount() {
        return account;
    }

    public Long getId() {
        return id;
    }

    public String getTime() {
        return time;
    }

    public String getDescription() {
        return description;
    }
}
