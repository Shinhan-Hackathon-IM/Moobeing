package com.im.moobeing.domain.credit.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreditGetResponse {
    private String ratingName;
    private Long requireUpRating;

    public static CreditGetResponse of(String ratingName, Long requireUpRating) {
        return CreditGetResponse.builder()
                .ratingName(ratingName)
                .requireUpRating(requireUpRating)
                .build();
    }
}
