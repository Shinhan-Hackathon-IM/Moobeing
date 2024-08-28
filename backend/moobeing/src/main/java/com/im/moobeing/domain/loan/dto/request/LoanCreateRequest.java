package com.im.moobeing.domain.loan.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoanCreateRequest {
    Long loanId;
    Long loanBalance;
    String accountNo;
}
