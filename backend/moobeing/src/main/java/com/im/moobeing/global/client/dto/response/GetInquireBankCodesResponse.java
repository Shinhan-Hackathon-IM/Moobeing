package com.im.moobeing.global.client.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;


@Getter
public class GetInquireBankCodesResponse {
    @JsonProperty("REC")  // JSON으로 직렬화될 때 "REC"로 이름이 설정됩니다.
    private List<REC> rec;

    @Getter
    public static class REC {
        String accountTypeUniqueNo;
        String status;
        String bankCode;
        String bankName;
        String ratingUniqueNo;
        String ratingName;
        String accountName;
        String loanPeriod;
        String minLoanBalance;
        String maxLoanBalance;
        String interestRate;
        String accountDescription;
        String applicationDate;
        String applicationTime;
        String decisionDate;
        String decisionTime;
    }
}
