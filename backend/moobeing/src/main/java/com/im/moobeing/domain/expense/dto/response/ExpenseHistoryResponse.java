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

	public static ExpenseHistoryResponse of(Expense expense) {
		return new ExpenseHistoryResponse(expense.getTitle(), expense.getExpenseCategory().getName(),
			expense.getPrice());
	}

	public static ExpenseHistoryResponse from(String title, String categoryName, int price) {
		return new ExpenseHistoryResponse(title, categoryName, price);
	}
}
