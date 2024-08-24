package com.im.moobeing.domain.expense.dto.response;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ExpenseDateResponse {
	private LocalDate date;
	private List<ExpenseHistoryResponse> history;

	public static ExpenseDateResponse of(LocalDate date, List<ExpenseHistoryResponse> history) {
		return new ExpenseDateResponse(date, history);
	}
}
