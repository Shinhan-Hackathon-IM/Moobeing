package com.im.moobeing.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("https://naem11.shop", "http://localhost:3000", "http://localhost:5173")
				.allowCredentials(true)
				.maxAge(3600)
				.allowedHeaders("*")
				.allowedMethods("*");

	}
}


