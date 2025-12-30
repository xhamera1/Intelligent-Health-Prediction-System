package com.healthapp.backend.config;

import com.healthapp.backend.model.User;
import com.healthapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Profile("dev")
@RequiredArgsConstructor
@Slf4j
public class DevAdminConfig {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public org.springframework.boot.CommandLineRunner createAdmin(
            @Value("${dev.admin.username:admin}") String username,
            @Value("${dev.admin.email:admin@example.com}") String email,
            @Value("${dev.admin.password:Admin1235678}") String rawPassword
    ) {
        return args -> {
            if (userRepository.existsByUsernameOrEmail(username, email)) {
                log.info("Dev admin already exists.");
                return;
            }
            User admin = User.builder()
                    .username(username)
                    .email(email)
                    .firstName("Admin")
                    .lastName("User")
                    .password(passwordEncoder.encode(rawPassword))
                    .role(User.Role.ADMIN)
                    .build();
            userRepository.save(admin);
            log.info("Created dev admin '{}' (dev profile). Set dev.admin.password env/property to control password.", username);
        };
    }
}