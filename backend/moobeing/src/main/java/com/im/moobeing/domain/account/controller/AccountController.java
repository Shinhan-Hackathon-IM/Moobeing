package com.im.moobeing.domain.account.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.im.moobeing.domain.account.service.AccountService;
import com.im.moobeing.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

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
}
