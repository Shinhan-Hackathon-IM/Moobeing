package com.im.moobeing.domain.loan.controller;

import com.im.moobeing.domain.loan.dto.request.GetAllLoanMapRequest;
import com.im.moobeing.domain.loan.dto.request.GetBuddyLoanMapRequest;
import com.im.moobeing.domain.loan.dto.request.GetLoanMapRequest;
import com.im.moobeing.domain.loan.service.LoanService;
import com.im.moobeing.domain.member.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/loan")
@RequiredArgsConstructor
public class LoanController {

	private final LoanService loanService;

	@Operation(summary = "맴버의 대출 리스트 조회", description = "맴버의 대출 리스트를 조회한다.")
	@GetMapping
	public ResponseEntity<?> getMemberLoan(@AuthenticationPrincipal Member member, @RequestParam String sort){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getMemberLoan(member, sort));
	}

	@Operation(summary = "선택한 대출 여정지도 검색", description = "선택한 대출 여정 지도를 검색한다.")
	@GetMapping("/map")
	public ResponseEntity<?> getLoanMap(@AuthenticationPrincipal Member member, @RequestParam GetLoanMapRequest getLoanMapRequest){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getLoanMap(member, getLoanMapRequest));
	}

	@Operation(summary = "총합 대출 여정지도 검색", description = "총합 대출 여정 지도를 검색한다.")
	@GetMapping("/all-map")
	public ResponseEntity<?> getAllLoanMap(@AuthenticationPrincipal Member member, @RequestBody GetAllLoanMapRequest getAllLoanMapRequest){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getAllLoanMap(member, getAllLoanMapRequest));
	}

	@Operation(summary = "나의 대출금 총금액 확인", description = "나의 대출금 총 금액을 확인한다")
	@GetMapping("/sum")
	public ResponseEntity<?> getSumLoan(@AuthenticationPrincipal Member member){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getSumLoan(member));
	}

	@Operation(summary = "또래 상환능력 조회", description = "또래 상환능력 조회 하기")
	@GetMapping("/buddy")
	public ResponseEntity<?> getBuddyLoanMap(@AuthenticationPrincipal Member member, @RequestBody GetBuddyLoanMapRequest getBuddyLoanMapRequest){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getBuddyLoanMap(member, getBuddyLoanMapRequest));
	}

	@Operation(summary = "이번달 상환 예정 금액 구하기", description = "이번달 상환 예정 금액 구하기")
	@GetMapping("/monthly")
	public ResponseEntity<?> getMonthlyLoan(@AuthenticationPrincipal Member member){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getMonthlyLoan(member));
	}

	@Operation(summary = "몇 퍼센트 상환인지 체크", description = "몇 퍼센트 상환인지 체크하기")
	@GetMapping("/percent")
	public ResponseEntity<?> getPercentLoan(@AuthenticationPrincipal Member member){
		return ResponseEntity.status(HttpStatus.OK).body(loanService.getPercentLoan(member));
	}
}
