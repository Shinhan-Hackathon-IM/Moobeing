package com.im.moobeing.global.client.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.im.moobeing.global.config.ApiKeyConfig;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommonHeader {

    private final String apiName;
    private final String transmissionDate;
    private final String transmissionTime;
    private final String institutionCode = "00100";
    private final String fintechAppNo = "001";
    private final String apiServiceCode;
    private final String institutionTransactionUniqueNo = ApiKeyConfig.accountProductCode;
    private final String apiKey;
    private final String userKey;


    public CommonHeader(String apiName, String transmissionDate, String transmissionTime, String apiKey, String userKey) {
        this.apiName = apiName;
        this.transmissionDate = transmissionDate;
        this.transmissionTime = transmissionTime;
        this.apiServiceCode = apiName;
        this.apiKey = apiKey;
        this.userKey = userKey;
    }
}
