package com.im.moobeing.global.client.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.im.moobeing.global.config.ApiKeyConfig;
import com.im.moobeing.global.util.RequestHeaderUtil;
import lombok.Getter;
import org.springframework.core.io.support.SpringFactoriesLoader;

@Getter
public class GetUpdateDemandDepositAccountTransferRequest {
    @JsonProperty("Header")  // JSON으로 직렬화될 때 "Header"로 이름이 설정됩니다.
    private final Header header;
    private final String depositAccountNo;
    private final Long transactionBalance;
    private final String withdrawalAccountNo;
    private final String depositTransactionSummary;
    private final String withdrawalTransactionSummary;

    public GetUpdateDemandDepositAccountTransferRequest(
            ApiKeyConfig apiKeyConfig,
            String userKey,
            String depositAccountNo,
            Long transactionBalance,
            String withdrawalAccountNo,
            String depositTransactionSummary,
            String withdrawalTransactionSummary
    ) {
        this.header = RequestHeaderUtil.createHeader(Header.class, this.getClass(), apiKeyConfig, userKey);
        this.depositAccountNo = depositAccountNo;
        this.transactionBalance = transactionBalance;
        this.withdrawalAccountNo = withdrawalAccountNo;
        this.depositTransactionSummary = depositTransactionSummary;
        this.withdrawalTransactionSummary = withdrawalTransactionSummary;
    }

    public record Header(String apiName, String transmissionDate, String transmissionTime, String institutionCode,
                         String fintechAppNo, String apiServiceCode, String institutionTransactionUniqueNo,
                         String apiKey, String userKey) {
    }
}
