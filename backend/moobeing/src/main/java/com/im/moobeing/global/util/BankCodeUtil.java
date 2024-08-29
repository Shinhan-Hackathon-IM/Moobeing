package com.im.moobeing.global.util;

import com.im.moobeing.global.client.ShinhanClient;
import com.im.moobeing.global.client.dto.request.GetInquireBankCodesRequest;
import com.im.moobeing.global.config.ApiKeyConfig;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class BankCodeUtil {

    private final Map<String, String> bankCodeToName = new HashMap<>();
    private final ShinhanClient shinhanClient;
    private final ApiKeyConfig apiKeyConfig;

    @PostConstruct
    public void init() {
        var response = shinhanClient.getInquireBankCodes(new GetInquireBankCodesRequest(apiKeyConfig));
        log.error("bankCodeStatusCode : " + response.getHeader().getResponseCode());
        response.getRec().forEach(rec -> {
            String bankCode = rec.getBankCode();
            String bankName = rec.getBankName();
            log.info("Bank code " + bankCode + " : " + bankName);
            bankCodeToName.put(bankCode, bankName);
        });
    }

    public Optional<String> getBankName(String bankCode) {
        return Optional.of(bankCodeToName.get(bankCode));
    }
    public boolean existsBankCode(String bankCode) { return bankCodeToName.containsKey(bankCode); }
}