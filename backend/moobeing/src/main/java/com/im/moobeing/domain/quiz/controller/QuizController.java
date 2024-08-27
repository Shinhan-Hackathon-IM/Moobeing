package com.im.moobeing.domain.quiz.controller;

import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.quiz.dto.request.QuizAnswerRequest;
import com.im.moobeing.domain.quiz.dto.response.QuizAnswerResponse;
import com.im.moobeing.domain.quiz.dto.response.QuizColdResponse;
import com.im.moobeing.domain.quiz.dto.response.QuizDetailResponse;
import com.im.moobeing.domain.quiz.dto.response.QuizResponse;
import com.im.moobeing.domain.quiz.service.QuizService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@RequiredArgsConstructor
public class QuizController {
	private final QuizService quizService;

//	@Operation(summary = "퀴즈 전체 조회", description = "사용자의 퀴즈를 전체 조회한다.")
//	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
//		content = @Content(mediaType = "application/json",
//			schema = @Schema(implementation = ErrorResponse.class),
//			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
//	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<List<QuizResponse>> getQuizAll(@AuthenticationPrincipal Member member) {
//		return ResponseEntity.ok(quizService.getQuizAll(member));
//	}

	@Operation(summary = "퀴즈 상세 조회", description = "사용자의 퀴즈를 상세 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping( produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<QuizDetailResponse> getQuiz(@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(quizService.getQuiz(member));
	}

	@Operation(summary = "미해결 퀴즈 조회", description = "사용자의 해결되지 않은 퀴즈가 있는지 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/cold", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<QuizColdResponse> getColdQuiz(@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(quizService.getQuizCold(member));
	}

	@Operation(summary = "퀴즈 정답 확인", description = "입력한 퀴즈의 정답이 맞는지 확인하고 상태를 변경한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PostMapping(path = "/{quizNum}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<QuizAnswerResponse> confirmQuizAnswer(
		@AuthenticationPrincipal Member member,
		@RequestBody QuizAnswerRequest quizAnswerRequest,
		@PathVariable long quizNum) {
		return ResponseEntity.ok(quizService.confirmQuizAnswer(member, quizNum, quizAnswerRequest));
	}
}
