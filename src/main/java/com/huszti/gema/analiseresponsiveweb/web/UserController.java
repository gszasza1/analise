package com.huszti.gema.analiseresponsiveweb.web;

import com.huszti.gema.analiseresponsiveweb.database.User;
import com.huszti.gema.analiseresponsiveweb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/adduser")
    public User addUser(@RequestBody User user)
    {
        userRepository.save(user);
        return user;
    }
}
