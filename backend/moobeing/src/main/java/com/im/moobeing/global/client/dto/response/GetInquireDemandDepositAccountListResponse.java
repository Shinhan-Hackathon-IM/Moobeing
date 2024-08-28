package com.im.moobeing.global.client.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GetInquireDemandDepositAccountListResponse {
    @JsonProperty("REC")  // JSON으로 직렬화될 때 "REC"로 이름이 설정됩니다.
    private List<REC> rec;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class REC {
        private String bankCode;
        private String bankName;
        private String userName;
        private String accountNo;
        private String accountName;
        private String accountTypeCode;
        private String accountTypeName;
        private String accountCreatedDate;
        private String accountExpiryDate;
        private String dailyTransferLimit;
        private String oneTimeTransferLimit;
        private String accountBalance;
        private String lastTransactionDate;
        private String currency;
    }
}