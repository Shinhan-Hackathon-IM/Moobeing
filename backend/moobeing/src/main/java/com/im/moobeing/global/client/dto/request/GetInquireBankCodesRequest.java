package com.im.moobeing.global.client.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.im.moobeing.global.config.ApiKeyConfig;
import com.im.moobeing.global.util.RequestHeaderUtil;
import lombok.Getter;

@Getter
public class GetInquireBankCodesRequest {
    @JsonProperty("Header")  // JSON으로 직렬화될 때 "Header"로 이름이 설정됩니다.
    private final Header header;

    public GetInquireBankCodesRequest(ApiKeyConfig apiKeyConfig) {
        this.header = RequestHeaderUtil.createHeader(Header.class, this.getClass(), apiKeyConfig, null);
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public record Header(String apiName, String transmissionDate, String transmissionTime, String institutionCode,
                         String fintechAppNo, String apiServiceCode, String institutionTransactionUniqueNo,
                         String apiKey, String userKey) {
    }
}

