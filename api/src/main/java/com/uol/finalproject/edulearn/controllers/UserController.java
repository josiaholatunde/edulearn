package com.uol.finalproject.edulearn.controllers;


import com.uol.finalproject.edulearn.annotations.WrapResponse;
import com.uol.finalproject.edulearn.apimodel.StudentUserDTO;
import com.uol.finalproject.edulearn.apimodel.UserDTO;
import com.uol.finalproject.edulearn.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/users")
@RequiredArgsConstructor
@WrapResponse
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @PutMapping("/{userId}")
    public StudentUserDTO editUser(@RequestBody StudentUserDTO studentUserDTO, @PathVariable String userId) {
        return userService.editUser(studentUserDTO, userId);
    }

    @GetMapping("/{userId}")
    public UserDTO editUser(@PathVariable String userId) {
        return userService.getUserDetails(userId);
    }
}
