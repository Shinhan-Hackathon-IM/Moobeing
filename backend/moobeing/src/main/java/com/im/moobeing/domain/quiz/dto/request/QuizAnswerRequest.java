package com.im.moobeing.domain.quiz.dto.request;

import com.im.moobeing.domain.quiz.entity.QuizInputAnswer;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class QuizAnswerRequest {
	private int baseValue;
	private QuizInputAnswer answer;

	public void setAnswer(String answer) {
		this.answer = QuizInputAnswer.from(answer);
	}
}
