package com.healthapp.backend.service;

import com.healthapp.backend.model.User;
import com.healthapp.backend.dto.user.UserResponse;
import com.healthapp.backend.exception.UserNotFoundException;
import com.healthapp.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    public List<Long> getLast30DaysRegistrations () {
        LocalDateTime end = LocalDate.now().atStartOfDay();
        LocalDateTime index = end.minusDays(29);
        List<Long> newRegisters = new ArrayList<>();
        while (index.isBefore(end.plusDays(1))) {
            newRegisters.add(userRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(index,index.plusDays(1)));
            index = index.plusDays(1);
        }
        return newRegisters;
    }





}
