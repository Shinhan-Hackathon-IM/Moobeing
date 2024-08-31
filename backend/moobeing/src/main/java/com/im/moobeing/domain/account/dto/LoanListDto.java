package com.im.moobeing.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoanListDto {
    private String loanName;
    private Long interestBalance;

    public static LoanListDto of(String LoanName, Long InterestBalance) {
        return LoanListDto.builder()
                .loanName(LoanName)
                .interestBalance(InterestBalance)
                .build();
    }
}
