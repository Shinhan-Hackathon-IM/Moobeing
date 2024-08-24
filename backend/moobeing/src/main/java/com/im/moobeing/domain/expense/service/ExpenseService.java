package com.im.moobeing.domain.expense.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.im.moobeing.domain.expense.dto.response.ExpenseCategoryResponse;
import com.im.moobeing.domain.expense.dto.response.ExpenseDateResponse;
import com.im.moobeing.domain.member.entity.Member;

@Service
public class ExpenseService {
	public List<ExpenseCategoryResponse> getExpenseCategory(Member member) {
		return null;
	}

	public List<ExpenseDateResponse> getExpenseAllByDate(Member member) {
		return null;
	}
}
