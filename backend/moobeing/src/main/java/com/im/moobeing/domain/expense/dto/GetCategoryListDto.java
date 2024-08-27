package com.im.moobeing.domain.expense.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetCategoryListDto {
	private String label;
	private Double percent;
	private long amount;

	public static GetCategoryListDto of(String label, Double percent, long amount) {
		return GetCategoryListDto.builder()
			.label(label)
			.percent(percent)
			.amount(amount)
			.build();
	}
}
