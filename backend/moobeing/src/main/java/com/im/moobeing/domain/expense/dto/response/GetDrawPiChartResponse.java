package com.im.moobeing.domain.expense.dto.response;

import java.util.List;

import com.im.moobeing.domain.expense.dto.GetCategoryListDto;
import com.im.moobeing.domain.expense.dto.GetDrawPiChartDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetDrawPiChartResponse {
	private List<GetDrawPiChartDto> getDrawPiChartDtoList;
	private List<GetCategoryListDto> getCategoryListDtoList;

	public static GetDrawPiChartResponse of(List<GetDrawPiChartDto> getDrawPiChartDtoList, List<GetCategoryListDto> getCategoryListDtoList) {
		return GetDrawPiChartResponse.builder()
			.getDrawPiChartDtoList(getDrawPiChartDtoList)
			.getCategoryListDtoList(getCategoryListDtoList)
			.build();
	}
}
