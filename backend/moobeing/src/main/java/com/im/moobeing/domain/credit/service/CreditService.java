package com.im.moobeing.domain.credit.service;

import com.im.moobeing.domain.credit.dto.response.CreditGetResponse;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.global.client.ShinhanClient;
import com.im.moobeing.global.client.dto.request.GetInquireMyCreditRatingRequest;
import com.im.moobeing.global.client.dto.response.GetInquireMyCreditRatingResponse;
import com.im.moobeing.global.config.ApiKeyConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CreditService {

    private final ShinhanClient shinhanClient;
    private final ApiKeyConfig apiKeyConfig;

    public CreditGetResponse getCredit(Member member) {
        // GetLoanInquireMyCreditRatingRequest 객체를 생성
        GetInquireMyCreditRatingRequest request = new GetInquireMyCreditRatingRequest(apiKeyConfig, member.getUserKey());

        // ShinhanClient를 사용하여 신한 API 호출
        GetInquireMyCreditRatingResponse getInquireMyCreditRatingResponse = null;

        getInquireMyCreditRatingResponse = shinhanClient.getInquireMyCreditRating(request);

        // 총 자산 값 가져오기
        long totalAssetValue = Long.parseLong(getInquireMyCreditRatingResponse.getRec().getTotalAssetValue());
        long neededAmount;

        // 조건에 따른 result 값 계산
        if (totalAssetValue >= 100_000_000) {
            neededAmount = 0; // 1억 이상이면 0
        } else if (totalAssetValue >= 80_000_000) {
            neededAmount = 100_000_000 - totalAssetValue; // 8천만 이상이면 1억 - 이 값
        } else if (totalAssetValue >= 50_000_000) {
            neededAmount = 80_000_000 - totalAssetValue; // 5천만 이상이면 8천만 - 이 값
        } else if (totalAssetValue >= 30_000_000) {
            neededAmount = 50_000_000 - totalAssetValue; // 3천만 이상이면 5천만 - 이 값
        } else {
            neededAmount = 30_000_000 - totalAssetValue; // 0원 이상이면 3천만 - 이 값
        }

        // 여기에 필요한 추가 로직을 작성하세요.
        return CreditGetResponse.of(getInquireMyCreditRatingResponse.getRec().getRatingName(), neededAmount);
    }
}
