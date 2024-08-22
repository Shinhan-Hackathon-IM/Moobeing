package com.im.moobeing.domain.quiz.dto.response;

import com.im.moobeing.domain.quiz.entity.Quiz;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class QuizAnswerResponse {
	private boolean isCorrect;

	public static QuizAnswerResponse from(Quiz quiz) {
		return new QuizAnswerResponse(quiz.getIsCorrect());
	}
}
