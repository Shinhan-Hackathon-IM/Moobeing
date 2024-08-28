package com.im.moobeing.domain.expense.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.im.moobeing.domain.expense.dto.GetCategoryListDto;
import com.im.moobeing.domain.expense.dto.GetDrawPiChartDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetDrawPiChartResponse {
	private Long totalExpense;

	@JsonProperty("getPieChartList")
	private List<GetDrawPiChartDto> getDrawPiChartDtoList;

	@JsonProperty("getCategoryList")
	private List<GetCategoryListDto> getCategoryListDtoList;

	public static GetDrawPiChartResponse of(Long totalExpense, List<GetDrawPiChartDto> getDrawPiChartDtoList, List<GetCategoryListDto> getCategoryListDtoList) {
		return GetDrawPiChartResponse.builder()
				.totalExpense(totalExpense)
			.getDrawPiChartDtoList(getDrawPiChartDtoList)
			.getCategoryListDtoList(getCategoryListDtoList)
			.build();
	}
}
