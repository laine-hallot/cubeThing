package io.PuzzelTimer;


/**
 * Created by meyerhallot on 4/22/17.
 */

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;


@Entity
public class Account {

    @OneToMany(mappedBy = "account")
    private Set<Time> times = new HashSet<>();

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @Size(max= 64)
    private String password;

    @NotNull
    @Size(max= 64)
    private String username;

    public Set<Time> getTimes() {
        return times;
    }

    public Long getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public Account(String username, String password) {
        this.username = username;
        System.out.println("Constructor Username: " +username);
        this.password = password;
        System.out.println("Constructor Password: " +password);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    Account() { // jpa only
    }
}
