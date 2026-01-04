package com.healthapp.backend.dto.predictionHistory;

import com.healthapp.backend.dto.prediction.HabitsPredictionResponse;
import org.springframework.data.domain.Page;

public record AdminPredictionHistoryResponse(
        Page<HeartAttackPredictionResponse> heartAttacks,
        Page<DiabetesPredictionResponse> diabetes,
        Page<StrokePredictionResponse> strokes,
        Page<HabitsPredictionResponse> habits,
        long totalCurrentDayPredictions
) {
}
