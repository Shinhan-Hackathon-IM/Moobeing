package com.im.moobeing.global.client.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
public class GetCreateLoanAccountResponse {
    @JsonProperty("Header")
    private CommonResponseHeader header;
    @JsonProperty("REC")
    private REC rec;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class REC {
        private String accountNo;
        private String accountName;
        private String status;
        private String accountTypeUniqueNo;
        private String loanPeriod;
        private String loanDate;
        private String maturityDate;
        private String loanBalance;
        private String interestRate;
        private String withdrawalAccountNo;
    }
}
