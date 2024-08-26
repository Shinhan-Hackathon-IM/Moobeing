package com.im.moobeing.domain.loan.entity;

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

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "MemberLoan")
public class MemberLoan {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_loan_id")
	private Long id;

	@Column(name = "member_id")
	private Long memberId;

	@Column(name = "loan_product_name")
	private Long loanProductName;

	@Column(name = "status")
	private String status;

	@Column(name = "initial_balance")
	private Long initialBalance;

	@Column(name = "remaining_balance")
	private Long remainingBalance;

	@Column(name = "start_loan")
	private String startLoan;

	@Column(name = "repayment_deadline")
	private String repaymentDeadline;

	@Column(name = "withdrawwal_account_no")
	private String withdrawalAccountNo;

	@Builder
	public MemberLoan(Long id, Long memberId, Long loanProductName, String status, Long initialBalance,
		Long remainingBalance, String startLoan, String repaymentDeadline, String withdrawalAccountNo) {
		this.id = id;
		this.memberId = memberId;
		this.loanProductName = loanProductName;
		this.status = status;
		this.initialBalance = initialBalance;
		this.remainingBalance = remainingBalance;
		this.startLoan = startLoan;
		this.repaymentDeadline = repaymentDeadline;
		this.withdrawalAccountNo = withdrawalAccountNo;
	}
}
