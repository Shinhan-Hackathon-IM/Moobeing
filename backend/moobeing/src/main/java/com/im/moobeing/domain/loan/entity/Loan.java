package com.im.moobeing.domain.loan.entity;

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
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "quiz")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Loan {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private Long loanId;

	@Column(name = "initial_balance")
	private Long initialBalance;

	@Column(name = "remaining_balance")
	private Long remainingBalance;

	@Column(name = "withdrawal_account_no")
	private String withdrawalAccountNo;

	@Column(name = "repayment_deadline")
	private LocalDateTime repaymentDeadline;

	private LoanStatus status;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "loan_product_id")
	private LoanProduct loanProduct;
}
