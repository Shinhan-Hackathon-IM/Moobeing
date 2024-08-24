package com.im.moobeing.domain.expense.entity;

import java.time.LocalDateTime;

import com.im.moobeing.domain.member.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "expense")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Expense {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long expenseId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "expense_category_id", nullable = false)
	private ExpenseCategory expenseCategory;

	@Column
	private String title;

	@Column
	private int price;

	@Column
	private LocalDateTime expenseDate;

	@Builder
	private Expense(Member member, ExpenseCategory expenseCategory, String title, int price,
		LocalDateTime expenseDate) {
		this.member = member;
		this.expenseCategory = expenseCategory;
		this.price = price;
		this.expenseDate = expenseDate;
	}
}
