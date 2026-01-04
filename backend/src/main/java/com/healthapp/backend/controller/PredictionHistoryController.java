package com.healthapp.backend.controller;

import com.healthapp.backend.annotation.IsOwnerOrAdmin;
import com.healthapp.backend.dto.predictionHistory.AdminPredictionHistoryResponse;
import com.healthapp.backend.dto.predictionHistory.PredictionHistoryResponse;
import com.healthapp.backend.service.PredictionHistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api/prediction-history")
@Slf4j
@RequiredArgsConstructor
public class PredictionHistoryController {

    private final PredictionHistoryService predictionHistoryService;

    @GetMapping(value = "/{userId}", produces = APPLICATION_JSON_VALUE)
    @IsOwnerOrAdmin
    public PredictionHistoryResponse getPredictionHistory(@PathVariable Long userId) {
        log.info("Received request to get prediction history for user with ID: {}", userId);
        return predictionHistoryService.getPredictionHistoryFor(userId);
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public AdminPredictionHistoryResponse getAllPredictionHistory(Pageable pageable) {
        log.info("Received request to get all prediction history (admin) with pageable: {}", pageable);
        return predictionHistoryService.getPredictionHistoryForAll(pageable);
    }
}