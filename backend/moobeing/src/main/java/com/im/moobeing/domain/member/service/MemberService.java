package com.im.moobeing.domain.member.service;

import com.im.moobeing.domain.member.dto.request.*;
import com.im.moobeing.domain.member.dto.response.*;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.member.entity.MemberRadish;
import com.im.moobeing.domain.member.repository.MemberRepository;
import com.im.moobeing.domain.radish.entity.Radish;
import com.im.moobeing.domain.radish.repository.RadishRepository;
import com.im.moobeing.global.client.ShinhanClient;
import com.im.moobeing.global.client.dto.request.GetUserKeyRequest;
import com.im.moobeing.global.client.dto.response.GetUserKeyResponse;
import com.im.moobeing.global.config.ApiKeyConfig;
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
    private final ShinhanClient shinhanClient;
    private final ApiKeyConfig apiKeyConfig;

    @Transactional
    public MemberCreateResponse createMember(MemberCreateRequest memberCreateRequest) {
        memberRepository.findByEmail(memberCreateRequest.getEmail()).ifPresent(member -> {
            throw new AuthenticationException(ErrorCode.AU_ALREADY_HANDLE);
        });

        String birthDay = String.valueOf(memberCreateRequest.getHumanNumber() / 10);

        String gender;

        int checkGender = memberCreateRequest.getHumanNumber() % 10;

        if (checkGender == 1 || checkGender == 3) {
            gender = "남자";
        } else if (checkGender == 2 || checkGender == 4){
            gender = "여자";
        } else{
            throw new RuntimeException("둘다 아니다. 넌 누구냐");
        }

        Member member = Member.builder()
                .email(memberCreateRequest.getEmail())
                .password(memberCreateRequest.getPassword())
                .name(memberCreateRequest.getName())
                .birthday(birthDay)
                .gender(gender)
                .build();

        //todo exception 설정 필요
        GetUserKeyResponse getUserKeyResponse = shinhanClient.getUserKey(new GetUserKeyRequest(apiKeyConfig.getApiKey(), member.getEmail()));

        member.setMemberUserKey(getUserKeyResponse.getUserKey());

        // method 화 필요함.
        Radish radish = radishRepository.findById(1L)
                .orElseThrow(() -> new IllegalArgumentException("Radish not found with id: " + 1L));

        MemberRadish newMemberRadish = MemberRadish.builder()
                .member(member)
                .radish(radish)
                .radishNumber(1L)
                .build();

        member.addMemberRadish(newMemberRadish);

        member = memberRepository.save(member); // 데이터베이스에 멤버 저장

        return MemberCreateResponse.of(member); // 저장된 멤버 정보를 바탕으로 응답 생성
    }

    public Member loginMember(MemberLoginRequest memberLoginRequest) {
        // 사용자 정보 조회
        Member member = memberRepository.findByEmail(memberLoginRequest.getEmail())
                .orElseThrow(() -> new AuthenticationException(ErrorCode.AU_NOT_FOUND_MEMBER));

        // 비밀번호 검증
        if (!member.getPassword().equals(memberLoginRequest.getPassword())) {
            throw new AuthenticationException(ErrorCode.AU_INVALID_LOGIN);
        }

        // 로그인 성공 응답 반환
        return member;
    }

    public MemberLoginResponse selectedRadishMember(Member member) {
        Radish radish = radishRepository.findById(member.getSelectedRadishId())
                .orElseThrow(() -> new IllegalArgumentException("Radish not found with id: " + member.getSelectedRadishId()));

        return MemberLoginResponse.of(member, radish.getRadishName(), radish.getRadishRank(), radish.getRadishImageUrl());
    }

    public MemberGetResponse getMember(Member member) {
        return MemberGetResponse.of(member);
    }

    @Transactional
    public void changeMember(Member member, MemberChangeRequest memberChangeRequest) {
        member.changeMember(memberChangeRequest);
        memberRepository.save(member);
    }

    public MemberRadishResponse getMemberRadish(Member member) {
        return MemberRadishResponse.of(member);
    }

    @Transactional
    public void addMemberRadish(Member member) {
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
            memberRepository.save(member);
        }
    }

    @Transactional
    public void changeMemberPw(Member member, MemberPwChangeRequest memberPwChangeRequest) {
        if (!member.getPassword().equals(memberPwChangeRequest.getOldPassword())) {
            throw new AuthenticationException(ErrorCode.AU_INVALID_PASSWORD);
        }

        member.changeMemberPw(memberPwChangeRequest);
        memberRepository.save(member);
    }

    public MemberCheckEmailResponse checkEmailMember(MemberCheckEmailRequest memberCheckEmailRequest) {
        if (memberRepository.findByEmail(memberCheckEmailRequest.getEmail()).isPresent()){
            return MemberCheckEmailResponse.of(false);
        }
        return MemberCheckEmailResponse.of(true);
    }
}
