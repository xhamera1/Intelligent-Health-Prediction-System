package com.healthapp.backend.service;

import com.healthapp.backend.dto.prediction.HabitsPredictionResponse;
import com.healthapp.backend.dto.predictionHistory.DiabetesPredictionResponse;
import com.healthapp.backend.dto.predictionHistory.HeartAttackPredictionResponse;
import com.healthapp.backend.dto.predictionHistory.PredictionHistoryResponse;
import com.healthapp.backend.dto.predictionHistory.StrokePredictionResponse;
import com.healthapp.backend.dto.predictionHistory.AdminPredictionHistoryResponse;
import org.springframework.data.domain.Pageable;
import com.healthapp.backend.repository.DiabetesRepository;
import com.healthapp.backend.repository.HabitAssessmentRepository;
import com.healthapp.backend.repository.HeartAttackRepository;
import com.healthapp.backend.repository.StrokeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PredictionHistoryService {

    private final HeartAttackRepository heartAttackRepository;
    private final DiabetesRepository diabetesRepository;
    private final StrokeRepository strokeRepository;
    private final HabitAssessmentRepository habitAssessmentRepository;

    @Transactional(readOnly = true)
    public PredictionHistoryResponse getPredictionHistoryFor(Long userId) {
        var heartAttackPredictionHistory = heartAttackRepository.findByUserId(userId)
                .stream()
                .map(HeartAttackPredictionResponse::createHeartAttackPredictionResponseFrom)
                .toList();
        var diabetesPredictionHistory = diabetesRepository.findByUserId(userId)
                .stream()
                .map(DiabetesPredictionResponse::createDiabetesPredictionResponseFrom)
                .toList();
        var strokePredictionHistory = strokeRepository.findByUserId(userId)
                .stream()
                .map(StrokePredictionResponse::createStrokePredictionResponseFrom)
                .toList();
        var habitsHistory = habitAssessmentRepository.findByUserId(userId)
                .stream()
                .map(HabitsPredictionResponse::from)
                .toList();

        return new PredictionHistoryResponse(
                strokePredictionHistory,
                diabetesPredictionHistory,
                heartAttackPredictionHistory,
                habitsHistory
        );
    }

    @Transactional(readOnly = true)
    public AdminPredictionHistoryResponse getPredictionHistoryForAll(Pageable pageable) {
        var heartPage = heartAttackRepository.findAll(pageable).map(HeartAttackPredictionResponse::createHeartAttackPredictionResponseFrom);
        var diabetesPage = diabetesRepository.findAll(pageable).map(DiabetesPredictionResponse::createDiabetesPredictionResponseFrom);
        var strokePage = strokeRepository.findAll(pageable).map(StrokePredictionResponse::createStrokePredictionResponseFrom);
        var habitsPage = habitAssessmentRepository.findAll(pageable).map(HabitsPredictionResponse::from);
        long totalCurrentDayPredictions = getPredictionSummaryForDate(LocalDate.now());
        return new AdminPredictionHistoryResponse(
                heartPage,
                diabetesPage,
                strokePage,
                habitsPage,
                totalCurrentDayPredictions
        );
    }

    public long getPredictionSummaryForDate(LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = start.plusDays(1);
        long heart = heartAttackRepository.countByCreatedAtBetween(start, end);
        long diabetes = diabetesRepository.countByCreatedAtBetween(start, end);
        long strokes = strokeRepository.countByCreatedAtBetween(start, end);
        long habits = habitAssessmentRepository.countByCreatedAtBetween(start, end);

        return heart + diabetes + strokes + habits;
    }
}
