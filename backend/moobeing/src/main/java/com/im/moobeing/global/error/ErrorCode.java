package com.im.moobeing.global.error;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	// common
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "CM000", "요청 처리 중 오류가 발생했습니다."),
	BAD_REQUEST(HttpStatus.BAD_REQUEST, "CM001", "잘못된 요청입니다."),
	INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "CM002", "잘못된 요청 데이터 입니다."),
	UNSUPPORTED_MEDIA_TYPE(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "CM003", "데이터 타입이 올바르지 않습니다"),
	NULL_POINTER_EXCEPTION(HttpStatus.BAD_REQUEST, "CM004", "ERROR: CM004"),
	SQL_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "CM005", "ERROR: CM005"),
	HIBERNATE_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "CM006", "ERROR: CM006"),

	// 인증 && 인가
	AU_SESSION_EXPIRED(HttpStatus.UNAUTHORIZED, "AU001", "유효한 세션이 아닙니다."),
	AU_INVALID_LOGIN(HttpStatus.UNAUTHORIZED, "AU002", "로그인 정보가 잘못되었습니다. 비밀번호를 확인해주세요."),

	// localDate format
	LF_FORMAT_NOT_MATCH(HttpStatus.BAD_REQUEST,"LD001","날짜 형식이 올바르지 않습니다. 형식은 yyyy-MM-dd'T'HH:mm:ss 입니다.");


	private final HttpStatus status;
	private final String code;
	private final String message;
}

