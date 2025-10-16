package org.example.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {
    @RequestMapping(value = { "/", "/myapp", "/todo", "/add", "/edit/**", "/delete/**" })
    public String index() {
         return "forward:/index.html";
    }
}
