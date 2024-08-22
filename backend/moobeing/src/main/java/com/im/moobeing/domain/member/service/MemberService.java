package com.im.moobeing.domain.member.service;

import com.im.moobeing.domain.member.dto.request.MemberCreateRequest;
import com.im.moobeing.domain.member.dto.request.MemberLoginRequest;
import com.im.moobeing.domain.member.dto.response.MemberCreateResponse;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.member.repository.MemberRepository;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.AuthenticationException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final HttpSession session;

    @Transactional
    public MemberCreateResponse createMember(MemberCreateRequest memberCreateRequest) {
        Member member = Member.builder()
                .handle(memberCreateRequest.getHandle())
                .password(memberCreateRequest.getPassword())
                .build();

        member = memberRepository.save(member); // 데이터베이스에 멤버 저장

        return MemberCreateResponse.of(member); // 저장된 멤버 정보를 바탕으로 응답 생성
    }

    public Member loginMember(MemberLoginRequest memberLoginRequest) {
        // 사용자 정보 조회
        Member member = memberRepository.findByHandle(memberLoginRequest.getHandle())
                .orElseThrow(() -> new RuntimeException("User not found."));

        // 비밀번호 검증
        if (!member.getPassword().equals(memberLoginRequest.getPassword())) {
            throw new AuthenticationException(ErrorCode.AU_INVALID_LOGIN);
        }

        // 로그인 성공 응답 반환
        return member;
    }
}
