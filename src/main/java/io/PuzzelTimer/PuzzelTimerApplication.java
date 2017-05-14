package io.PuzzelTimer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;


@SpringBootApplication
public class PuzzelTimerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PuzzelTimerApplication.class, args);
	}

	@Bean
    CommandLineRunner init(AccountRepository accountRepository, TimeRepository timeRepository){
        return (evt) -> Arrays.asList(
                "jhoeller,dsyer,pwebb,ogierke,rwinch,mfisher,mpollack,jlong,all".split(","))
        .forEach(
                a ->{
                    Account account = accountRepository.save(new Account(a,
                            "password"));
                    timeRepository.save(new Time(account,
                            "http://bookmark.com/1/" + a, "A description"));
                    timeRepository.save(new Time(account,
                            "http://bookmark.com/2/" + a, "A description"));
                });
    }
}
