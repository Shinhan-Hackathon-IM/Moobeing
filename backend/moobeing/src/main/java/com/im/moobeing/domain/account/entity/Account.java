package com.im.moobeing.domain.account.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "account")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "account_id")
	private Long accountId;

	@Column(name = "account_name", nullable = true)
	private String accountName;

	@Column(name = "account_num", nullable = true)
	private String accountNum;

	@Column(name = "member_id", nullable = true)
	private Long memberId;

	@Column(name = "account_balance", nullable = true)
	private Long accountBalance;

	@Builder
	public Account(Long accountId, String accountNum, Long memberId, Long accountBalance) {
		this.accountId = accountId;
		this.accountNum = accountNum;
		this.memberId = memberId;
		this.accountBalance = accountBalance;
	}

	public void setAccountBalance(Long accountBalance) {
		this.accountBalance = accountBalance;
	}
}
