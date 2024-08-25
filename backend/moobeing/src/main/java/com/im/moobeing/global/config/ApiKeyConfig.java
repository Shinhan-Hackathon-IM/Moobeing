package com.im.moobeing.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiKeyConfig {

    @Value("${SHINHAN_APIKEY}")
    private String apiKey;

    public String getApiKey() {
        return apiKey;
    }
}

