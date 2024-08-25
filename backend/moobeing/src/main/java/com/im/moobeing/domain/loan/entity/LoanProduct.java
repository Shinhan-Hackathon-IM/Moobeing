package com.im.moobeing.domain.loan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "loan_product")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoanProduct {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "loan_prdoduct_id")
	private Long loanProductId;

	@Column(name = "bank_name")
	private String bankName;

	@Column(name = "account_name")
	private String accountName;

	@Column(name = "loan_period")
	private Integer loanPeriod;

	@Column(name = "interest_rate")
	private Double interestRate;

	@Column(name = "description")
	private String description;
}
