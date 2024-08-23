package com.im.moobeing.domain.member.service;

import com.im.moobeing.domain.member.dto.request.MemberChangeRequest;
import com.im.moobeing.domain.member.dto.request.MemberCreateRequest;
import com.im.moobeing.domain.member.dto.request.MemberLoginRequest;
import com.im.moobeing.domain.member.dto.request.MemberPwChangeRequest;
import com.im.moobeing.domain.member.dto.response.MemberCreateResponse;
import com.im.moobeing.domain.member.dto.response.MemberGetResponse;
import com.im.moobeing.domain.member.dto.response.MemberRadishResponse;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.member.entity.MemberRadish;
import com.im.moobeing.domain.member.repository.MemberRepository;
import com.im.moobeing.domain.radish.entity.Radish;
import com.im.moobeing.domain.radish.repository.RadishRepository;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.AuthenticationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final RadishRepository radishRepository;

    @Transactional
    public MemberCreateResponse createMember(MemberCreateRequest memberCreateRequest) {
        memberRepository.findByHandle(memberCreateRequest.getHandle()).ifPresent(member -> {
            throw new AuthenticationException(ErrorCode.AU_ALREADY_HANDLE);
        });

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
                .orElseThrow(() -> new AuthenticationException(ErrorCode.AU_NOT_FOUND_MEMBER));

        // 비밀번호 검증
        if (!member.getPassword().equals(memberLoginRequest.getPassword())) {
            throw new AuthenticationException(ErrorCode.AU_INVALID_LOGIN);
        }

        // 로그인 성공 응답 반환
        return member;
    }

    public MemberGetResponse getMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new AuthenticationException(ErrorCode.AU_NOT_FOUND_MEMBER));

        return MemberGetResponse.of(member);
    }

    @Transactional
    public void changeMember(Long memberId, MemberChangeRequest memberChangeRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new AuthenticationException(ErrorCode.AU_NOT_FOUND_MEMBER));

        member.changeMember(memberChangeRequest);
    }

    public MemberRadishResponse getMemberRadish(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new AuthenticationException(ErrorCode.AU_NOT_FOUND_MEMBER));

        return MemberRadishResponse.of(member);
    }

    @Transactional
    public void addMemberRadish(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new AuthenticationException(ErrorCode.AU_NOT_FOUND_MEMBER));

        // 랜덤 Radish ID 선택
        Long randomRadishId = 1 + new Random().nextLong(radishRepository.count());

        // 해당 radishId에 대한 Radish 엔티티를 찾습니다.
        Radish radish = radishRepository.findById(randomRadishId)
                .orElseThrow(() -> new IllegalArgumentException("Radish not found with id: " + randomRadishId));

        // MemberRadish 생성 및 추가
        MemberRadish existingMemberRadish = member.getMemberRadishes().stream()
                .filter(memberRadish -> memberRadish.getRadish().getId().equals(randomRadishId))
                .findFirst()
                .orElse(null);

        if (existingMemberRadish != null) {
            existingMemberRadish.addRadishNumber();
        } else {
            MemberRadish newMemberRadish = MemberRadish.builder()
                    .member(member)
                    .radish(radish)
                    .radishNumber(1L)
                    .build();
            member.addMemberRadish(newMemberRadish);
        }
    }

    @Transactional
    public void changeMemberPw(Long memberId, MemberPwChangeRequest memberPwChangeRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new AuthenticationException(ErrorCode.AU_NOT_FOUND_MEMBER));

        if (!member.getPassword().equals(memberPwChangeRequest.getOldPassword())) {
            throw new AuthenticationException(ErrorCode.AU_INVALID_LOGIN);
        }

        member.changeMemberPw(memberPwChangeRequest);
    }
}
