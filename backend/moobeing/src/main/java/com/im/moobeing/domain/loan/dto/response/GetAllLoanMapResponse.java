package com.im.moobeing.domain.loan.dto.response;

import java.util.List;

import com.im.moobeing.domain.loan.dto.GetAllLoanMapDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetAllLoanMapResponse {
	private Long maxLoanBalance;
	private Long minLoanBalance;
	private List<GetAllLoanMapDto> getAllLoanMapDtoList;

	public static GetAllLoanMapResponse of(long maxLoanBalance, long minLoanBalance, List<GetAllLoanMapDto> allLoanMapDtoList) {
		return GetAllLoanMapResponse.builder()
			.maxLoanBalance(maxLoanBalance)
			.minLoanBalance(minLoanBalance)
			.getAllLoanMapDtoList(allLoanMapDtoList)
			.build();
	}
}
