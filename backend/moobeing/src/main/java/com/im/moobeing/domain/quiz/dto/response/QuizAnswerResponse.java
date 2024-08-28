package com.im.moobeing.domain.quiz.dto.response;

import com.im.moobeing.domain.quiz.entity.Quiz;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuizAnswerResponse {
	private boolean isCorrect;
	private int answer;
	private String message;

	public static QuizAnswerResponse from(Quiz quiz,String message) {
		return new QuizAnswerResponse(quiz.getIsCorrect(), quiz.getAnswer(), message);
	}
}
