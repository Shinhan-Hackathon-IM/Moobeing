package com.im.moobeing.global.client.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
public class GetUpdateDemandDepositAccountDepositResponse {
    @JsonProperty("Header")
    private CommonResponseHeader header;
    @JsonProperty("REC")
    private REC rec;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class REC {
        private String transactionUniqueNo;
        private String transactionDate;
    }
}
