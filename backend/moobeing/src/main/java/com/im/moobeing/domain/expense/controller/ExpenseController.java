package com.im.moobeing.domain.expense.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.im.moobeing.domain.expense.dto.response.ExpenseCategoryResponse;
import com.im.moobeing.domain.expense.dto.response.ExpenseDateResponse;
import com.im.moobeing.domain.expense.service.ExpenseService;
import com.im.moobeing.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/expense")
@RequiredArgsConstructor
public class ExpenseController {
	private final ExpenseService expenseService;

	@Operation(summary = "소비 카테고리별 조회", description = "사용자의 한달간 소비를 카테고리별로 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/category", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ExpenseCategoryResponse>> getExpenseCategory(@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(expenseService.getExpenseCategory(member));
	}

	@Operation(summary = "일자별 소비 내역 조회", description = "사용자의 한달 소비를 날짜별로 보여준다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ExpenseDateResponse>> getExpenseAllByDate(@AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(expenseService.getExpenseAllByDate(member));
	}
}
