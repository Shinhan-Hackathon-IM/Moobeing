package com.im.moobeing.domain.credit.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreditGetResponse {
    private String ratingName;
    private Double ratingPercent;

    public static CreditGetResponse of(String ratingName, Double ratingPercent) {
        return CreditGetResponse.builder()
                .ratingName(ratingName)
                .ratingPercent(ratingPercent)
                .build();
    }
}
