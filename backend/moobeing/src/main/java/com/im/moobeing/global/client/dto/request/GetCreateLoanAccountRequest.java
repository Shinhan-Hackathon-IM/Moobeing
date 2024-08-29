package com.im.moobeing.global.client.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.im.moobeing.global.config.ApiKeyConfig;
import com.im.moobeing.global.util.RequestHeaderUtil;
import lombok.Getter;

@Getter
public class GetCreateLoanAccountRequest {
    @JsonProperty("Header")  // JSON으로 직렬화될 때 "Header"로 이름이 설정됩니다.
    private final Header header;
    private final String accountTypeUniqueNo;
    private final String loanBalance;
    private final String withdrawalAccountNo;

    /**
     * 대출용 생성자
     *
     * @param apiKeyConfig The API key configuration
     * @param userKey The user key
     * @param loanBalance 대출금
     * @param withdrawalAccountNo 출금 계좌번호
     */
    public GetCreateLoanAccountRequest(ApiKeyConfig apiKeyConfig, String userKey, String loanBalance, String withdrawalAccountNo, String accountTypeUniqueNo) {
        this.header = RequestHeaderUtil.createHeader(Header.class, this.getClass(), apiKeyConfig, userKey);
        this.loanBalance = loanBalance;
        this.withdrawalAccountNo = withdrawalAccountNo;
        this.accountTypeUniqueNo = accountTypeUniqueNo;
    }

    public record Header(String apiName, String transmissionDate, String transmissionTime, String institutionCode,
                         String fintechAppNo, String apiServiceCode, String institutionTransactionUniqueNo,
                         String apiKey, String userKey) {
    }
}
