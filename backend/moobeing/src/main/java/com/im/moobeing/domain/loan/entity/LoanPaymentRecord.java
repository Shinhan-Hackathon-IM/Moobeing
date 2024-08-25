package com.im.moobeing.domain.loan.entity;

import java.time.LocalDateTime;

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

@Table(name = "loan_payment_record")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoanPaymentRecord {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "loan_paymnet_record_id")
	private Long loanPaymnetRecordId;

	@Column(name = "repayment_balance")
	private Long repaymentBalance;

	@Column(name = "repayment_date")
	private LocalDateTime repaymentDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "loan_id")
	private Loan loan;
}
