package com.healthapp.backend.service;

import com.healthapp.backend.model.User;
import com.healthapp.backend.dto.user.UserResponse;
import com.healthapp.backend.exception.UserNotFoundException;
import com.healthapp.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static com.healthapp.backend.dto.user.UserResponse.createUserResponseFrom;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final DiabetesRepository diabetesRepository;
    private final HabitAssessmentRepository habitAssessmentRepository;
    private final HeartAttackRepository heartAttackRepository;
    private final StrokeRepository strokeRepository;
    private final UserRepository userRepository;


    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(UserResponse::createUserResponseFrom);
    }

    public UserResponse getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        return createUserResponseFrom(user);
    }





}
