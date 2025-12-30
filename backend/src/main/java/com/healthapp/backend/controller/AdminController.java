package com.healthapp.backend.controller;

import com.healthapp.backend.dto.user.UserEditRequest;
import com.healthapp.backend.dto.user.UserResponse;
import com.healthapp.backend.service.AdminService;
import com.healthapp.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api/admin_users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final AdminService adminService;
    private final UserService userService;

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return adminService.getAllUsers(pageable);
    }

    @GetMapping(value = "/{userId}", produces = APPLICATION_JSON_VALUE)
    public UserResponse getUser(@PathVariable Long userId) {
        return adminService.getUserById(userId);
    }

    @PutMapping(value = "/{userId}", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public UserResponse updateUser(@PathVariable Long userId, @RequestBody UserEditRequest request) {
        return userService.updateUser(userId, request);
    }

    @DeleteMapping(value = "/{userId}", produces = APPLICATION_JSON_VALUE)
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }
}
