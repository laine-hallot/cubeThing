package io.PuzzelTimer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;


/**
 * Created by meyerhallot on 5/10/17.
 */

@Controller
public class HomePageController implements ErrorController{

    @Value("${welcome.message:test}")
    private String message = "Hello World";


    @RequestMapping("/meme")
    String hello(){
        return "new";
    }

    @RequestMapping("/ohfuck")
    String error(){
        return "ohFuck";
    }

    @Override
    public String getErrorPath() {
        return "/ohfuck";
    }

}


//<img th:src="@{../../images/PuzzelTimerLogo.png}">