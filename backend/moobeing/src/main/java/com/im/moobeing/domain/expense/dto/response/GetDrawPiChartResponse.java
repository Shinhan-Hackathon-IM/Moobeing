package com.im.moobeing.domain.expense.dto.response;

import com.im.moobeing.domain.expense.dto.GetCategoryListDto;
import com.im.moobeing.domain.expense.dto.GetDrawPiChartDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetDrawPiChartResponse {
	private Long totalExpense;
	private List<GetDrawPiChartDto> getDrawPiChartDtoList;
	private List<GetCategoryListDto> getCategoryListDtoList;

	public static GetDrawPiChartResponse of(Long totalExpense, List<GetDrawPiChartDto> getDrawPiChartDtoList, List<GetCategoryListDto> getCategoryListDtoList) {
		return GetDrawPiChartResponse.builder()
				.totalExpense(totalExpense)
			.getDrawPiChartDtoList(getDrawPiChartDtoList)
			.getCategoryListDtoList(getCategoryListDtoList)
			.build();
	}
}
