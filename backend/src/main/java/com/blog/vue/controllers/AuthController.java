package com.blog.vue.controllers;

import com.blog.vue.dto.LoginRequest;
import com.blog.vue.models.User;
import com.blog.vue.repositories.UserRepository;
import com.blog.vue.security.jwt.JWTService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/auth/")
public class AuthController {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    public JWTService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userFetched =  userRepository.findByUsername(request.username());

        return userFetched.map(user -> {
            if (passwordEncoder.matches(request.password(), user.getPassword())) {
                return ResponseEntity.ok().body(java.util.Map.of("token", authService.generateToken(request.username())));
            } else {
                return ResponseEntity.status(401).body("Invalid username or password");
            }
        })
        .orElse(new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
    }
}
