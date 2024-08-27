package com.im.moobeing.domain.account.dto.response;

import java.util.List;

import com.im.moobeing.domain.account.dto.GetAccountDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetAccountResponse {
	private List<GetAccountDto> getAccountDtoList;

	public static GetAccountResponse of(List<GetAccountDto> getAccountDtoList) {
		return GetAccountResponse.builder()
			.getAccountDtoList(getAccountDtoList)
			.build();
	}
}
