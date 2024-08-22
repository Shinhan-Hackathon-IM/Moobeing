package com.im.moobeing.domain.quiz.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.quiz.dto.request.QuizAnswerRequest;
import com.im.moobeing.domain.quiz.dto.response.QuizAnswerResponse;
import com.im.moobeing.domain.quiz.dto.response.QuizColdResponse;
import com.im.moobeing.domain.quiz.dto.response.QuizDetailResponse;
import com.im.moobeing.domain.quiz.dto.response.QuizResponse;

@Service
public class QuizService {
	public List<QuizResponse> getQuizAll(Member member) {
		return null;
	}

	public QuizDetailResponse getQuiz(Member member, long quizNum) {
		return null;
	}

	public QuizColdResponse getQuizCold(Member member) {
		return null;
	}

	public QuizAnswerResponse confirmQuizAnswer(Member member, long quizNum, QuizAnswerRequest quizAnswerRequest) {
		return null;
	}
}
