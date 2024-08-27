package com.im.moobeing.domain.quiz.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuizColdResponse {
	private boolean isExist;

	private static QuizColdResponse from(Boolean isExist) {
		return new QuizColdResponse(isExist);
	}
}
