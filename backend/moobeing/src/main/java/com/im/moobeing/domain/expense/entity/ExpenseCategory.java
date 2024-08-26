package com.im.moobeing.domain.expense.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "expense_category")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ExpenseCategory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long expenseCategoryId;

	@Column
	private String name;

	@Builder
	public ExpenseCategory(Long expenseCategoryId, String name) {
		this.expenseCategoryId = expenseCategoryId;
		this.name = name;
	}
}
