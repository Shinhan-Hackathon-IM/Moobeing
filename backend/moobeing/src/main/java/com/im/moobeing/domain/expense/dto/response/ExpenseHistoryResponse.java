package com.im.moobeing.domain.expense.dto.response;

import com.im.moobeing.domain.expense.entity.Expense;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ExpenseHistoryResponse {
	private String title;
	private String categoryName;
	private int price;

	public static ExpenseHistoryResponse from(Expense expense) {
		return new ExpenseHistoryResponse(expense.getTitle(), expense.getExpenseCategory().getName(),
			expense.getPrice());
	}
}
