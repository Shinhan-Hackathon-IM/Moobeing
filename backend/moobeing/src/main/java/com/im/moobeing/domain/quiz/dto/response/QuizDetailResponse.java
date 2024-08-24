package com.im.moobeing.domain.quiz.dto.response;

import java.time.LocalDateTime;

import com.im.moobeing.domain.quiz.entity.Quiz;

public class QuizDetailResponse extends QuizResponse {
	private Boolean isCorrect;
	private LocalDateTime endedAt;

	public QuizDetailResponse(Long quizId, LocalDateTime createdDate, String status, Boolean isCorrect,
		LocalDateTime endedAt) {
		super(quizId, createdDate, status);
		this.isCorrect = isCorrect;
		this.endedAt = endedAt;
	}

	public static QuizDetailResponse from(Quiz quiz) {
		return new QuizDetailResponse(quiz.getQuizId(), quiz.getCreatedDate(), quiz.getStatus().getDisplayName(),
			quiz.getIsCorrect(), quiz.getEndedAt());
	}
}
