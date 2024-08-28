package com.im.moobeing.domain.loan.dto.response;

import com.im.moobeing.domain.loan.dto.GetMemberLoanDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetMemberLoanResponse {
	private Long totalLoanAmount;
	private List<GetMemberLoanDto> getMemberLoanDtoList;

	public static GetMemberLoanResponse of(Long totalLoanAmount, List<GetMemberLoanDto> getMemberLoanDtoList) {
		return GetMemberLoanResponse.builder()
				.totalLoanAmount(totalLoanAmount)
			.getMemberLoanDtoList(getMemberLoanDtoList)
			.build();
	}
}
