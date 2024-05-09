package com.uol.finalproject.edulearn.controllers;


import com.uol.finalproject.edulearn.annotations.WrapResponse;
import com.uol.finalproject.edulearn.apimodel.StudentUserDTO;
import com.uol.finalproject.edulearn.apimodel.UserDTO;
import com.uol.finalproject.edulearn.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = "/api/users")
@RequiredArgsConstructor
@WrapResponse
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

    @GetMapping("/online/active")
    public Page<StudentUserDTO> getOnlineUsers(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
       return userService.getActiveUsersOnline(PageRequest.of(page, size));
    }


    @PostMapping("/{userId}/profile-image")
    public StudentUserDTO editProfileImage(@PathVariable String userId, @RequestParam("profileImage") MultipartFile file) {
        return userService.editProfileImage(userId, file);
    }

    @PutMapping("/{userId}/logged-in-status/{isLoggedIn}")
    public void updateLoggedInStatus(@PathVariable String userId, @PathVariable boolean isLoggedIn) {
        userService.updateLoggedInStatus(isLoggedIn, userId);
    }
}
