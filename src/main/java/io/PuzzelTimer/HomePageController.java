package io.PuzzelTimer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;


/**
 * Created by meyerhallot on 5/10/17.
 */

@Controller
public class HomePageController {

    @Value("${welcome.message:test}")
    private String message = "Hello World";


    @RequestMapping("/meme")
    String hello(Map<String, Object> model){
        model.put("message", this.message);
        return "new";
    }

    @RequestMapping("/greeting")
    public String greeting() {
        return "index";
    }
}


//<img th:src="@{../../images/PuzzelTimerLogo.png}">