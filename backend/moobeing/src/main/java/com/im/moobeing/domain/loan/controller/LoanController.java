package com.im.moobeing.domain.loan.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.im.moobeing.domain.loan.service.LoanService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class LoanController {
	private final LoanService loanService;

}
