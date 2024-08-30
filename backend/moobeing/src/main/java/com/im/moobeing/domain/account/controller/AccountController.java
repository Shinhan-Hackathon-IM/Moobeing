package com.im.moobeing.domain.account.controller;

import com.im.moobeing.domain.account.dto.request.SendAccountRequest;
import com.im.moobeing.domain.account.service.AccountService;
import com.im.moobeing.domain.member.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

	private final AccountService accountService;

	@Operation(summary = "맴버의 계좌 조회", description = "맴버의 계좌를 정해야 한다.")
	@GetMapping
	public ResponseEntity<?> getAccount(@AuthenticationPrincipal Member member) {
		return ResponseEntity.status(HttpStatus.OK).body(accountService.getAccount(member));
	}

	@Operation(summary = "대출금 상납", description = "계좌 송금 조회하기")
	@PostMapping
	public ResponseEntity<?> sendAccount(@AuthenticationPrincipal Member member, @RequestBody SendAccountRequest sendAccountRequest) {
		return ResponseEntity.status(HttpStatus.OK).body(accountService.sendAccount(member, sendAccountRequest));
	}

	// 대출 상납시 얻을 수 있는 이익 계산 API
	@Operation(summary = "대출금 상납시 얻을 수 있는 이익 계산", description = "대출금 상납시 얻을 수 있는 이익 계산 API")
	@GetMapping("/benefit")
	public ResponseEntity<?> profitMargin(@AuthenticationPrincipal Member member) {
		return ResponseEntity.status(HttpStatus.OK).body(accountService.profitMargin(member));
	}

}
