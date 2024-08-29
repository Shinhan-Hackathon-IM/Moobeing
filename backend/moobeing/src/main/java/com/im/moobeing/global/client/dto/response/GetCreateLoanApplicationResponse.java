package com.im.moobeing.global.client.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
public class GetCreateLoanApplicationResponse {
    @JsonProperty("REC")
    private REC rec;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class REC {
        private String accountTypeUniqueNo;
        private String status;
        private String bankCode;
        private String bankName;
        private String ratingUniqueNo;
        private String ratingName;
        private String accountName;
        private String loanPeriod;
        private String minLoanBalance;
        private String maxLoanBalance;
        private String interestRate;
        private String accountDescription;
        private String applicationDate;
        private String applicationTime;
        private String decisionDate;
        private String decisionTime;
    }
}
