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
	AU_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "AU001", "토큰이 만료되었습니다."),
	AU_NOT_VALID_TOKEN(HttpStatus.UNAUTHORIZED, "AU002", "해당 토큰은 유효한 토큰이 아닙니다."),
	AU_NOT_EXISTS_AUTHORIZATION(HttpStatus.UNAUTHORIZED, "AU003", "Authorization Header가 빈값입니다."),
	AU_NOT_VALID_BEARER_GRANT_TYPE(HttpStatus.UNAUTHORIZED, "AU004", "인증 타입이 Bearer 타입이 아닙니다."),
	AU_REFRESH_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "AU005", "해당 refresh token은 존재하지 않습니다."),
	AU_REFRESH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "AU006", "해당 refresh token은 만료됐습니다."),
	AU_NOT_ACCESS_TOKEN_TYPE(HttpStatus.UNAUTHORIZED, "AU007", "해당 토큰은 ACCESS TOKEN이 아닙니다."),
	AU_FORBIDDEN_ADMIN(HttpStatus.FORBIDDEN, "AU008", "관리자 Role이 아닙니다."),
	AU_ACCESS_TOKEN_REFRESH(HttpStatus.UNAUTHORIZED, "AU009", "액세스 토큰 재발급 하였습니다."),

	// localDate format
	LF_FORMAT_NOT_MATCH(HttpStatus.BAD_REQUEST,"LD001","날짜 형식이 올바르지 않습니다. 형식은 yyyy-MM-dd'T'HH:mm:ss 입니다."),

	// Quiz
	INVALID_QUIZ_TYPE(HttpStatus.BAD_REQUEST, "QZ001", "올바르지 않은 퀴즈 타입입니다."),
	INVALID_STATUS_TYPE(HttpStatus.BAD_REQUEST, "QZ002", "올바르지 않은 퀴즈 상태입니다.");

	private final HttpStatus status;
	private final String code;
	private final String message;
}

