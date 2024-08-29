package com.im.moobeing.global.client;

import com.im.moobeing.domain.account.dto.request.GetCreateDemandDepositAccountRequest;
import com.im.moobeing.domain.account.dto.response.GetCreateDemandDepositAccountResponse;
import com.im.moobeing.global.client.dto.request.*;
import com.im.moobeing.global.client.dto.response.*;
import com.im.moobeing.global.config.FeignClientConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(url = "https://finopenapi.p.ssafy.io/ssafy/api/v1", name = "ShinhanClient", configuration = FeignClientConfig.class)
public interface ShinhanClient {

    // userKey 발급 구현
    @PostMapping(value = "/member/", consumes = "application/json", produces = "application/json")
    GetUserKeyResponse getUserKey(
            @RequestBody GetUserKeyRequest requestDto
    );

    // userKey 발급 구현
    @PostMapping(value = "/edu/loan/inquireMyCreditRating", consumes = "application/json", produces = "application/json")
    GetInquireMyCreditRatingResponse getInquireMyCreditRating(
            @RequestBody GetInquireMyCreditRatingRequest getInquireMyCreditRatingRequest
    );


    // 은행코드 조회
    @PostMapping(value = "/edu/bank/inquireBankCodes", consumes = "application/json", produces = "application/json")
    GetInquireBankCodesResponse getInquireBankCodes(
            @RequestBody GetInquireBankCodesRequest getInquireBankCodesRequest
    );

    // 입출금

    // 계좌 개설
    @PostMapping(value = "/edu/demandDeposit/createDemandDepositAccount", consumes = "application/json", produces = "application/json")
    GetCreateDemandDepositAccountResponse getCreateDemandDepositAccount(
            @RequestBody GetCreateDemandDepositAccountRequest getCreateDemandDepositAccountRequest
    );

    // 가입 계좌 목록 확인
    @PostMapping(value = "/edu/demandDeposit/inquireDemandDepositAccountList", consumes = "application/json", produces = "application/json")
    GetInquireDemandDepositAccountListResponse getInquireDemandDepositAccountList(
            @RequestBody GetInquireDemandDepositAccountListRequest getInquireDemandDepositAccountListRequest
    );

    // 송금
    @PostMapping(value = "/edu/demandDeposit/updateDemandDepositAccountTransfer", consumes = "application/json", produces = "application/json")
    GetUpdateDemandDepositAccountTransferResponse getUpdateDemandDepositAccountTransfer(
            @RequestBody GetUpdateDemandDepositAccountTransferRequest getUpdateDemandDepositAccountTransferRequest
    );

    // 계좌 입금 = 돈 넣기
    @PostMapping(value = "/edu/demandDeposit/updateDemandDepositAccountDeposit", consumes = "application/json", produces = "application/json")
    GetUpdateDemandDepositAccountDepositResponse getUpdateDemandDepositAccountDeposit(
            @RequestBody GetUpdateDemandDepositAccountDepositRequest getUpdateDemandDepositAccountDepositRequest
    );

    // 대출
    // 대출 심사
    @PostMapping(value = "/edu/loan/createLoanApplication", consumes = "application/json", produces = "application/json")
    GetCreateLoanApplicationResponse getCreateLoanApplication(
            @RequestBody GetCreateLoanApplicationRequest getCreateLoanApplicationRequest
    );

    // 대출
    @PostMapping(value = "/edu/loan/createLoanAccount", consumes = "application/json", produces = "application/json")
    GetCreateLoanAccountResponse getCreateLoanAccount(
            @RequestBody GetCreateLoanAccountRequest getCreateLoanAccountRequest
    );
}