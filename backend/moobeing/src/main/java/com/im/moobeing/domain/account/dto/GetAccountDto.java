package com.im.moobeing.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetAccountDto {
	private String accountNum;

	public static GetAccountDto of(String accountNum) {
		return GetAccountDto.builder()
			.accountNum(accountNum)
			.build();
	}
}
