package com.uol.finalproject.edulearn.controllers;


import com.uol.finalproject.edulearn.apimodel.StudentUserDTO;
import com.uol.finalproject.edulearn.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/{userId}")
    public StudentUserDTO editUser(@RequestBody StudentUserDTO studentUserDTO, @PathVariable String userId) {
        return userService.editUser(studentUserDTO, userId);
    }
}
