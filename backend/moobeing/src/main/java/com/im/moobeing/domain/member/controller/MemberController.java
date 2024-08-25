package com.im.moobeing.domain.member.controller;

import com.im.moobeing.domain.member.dto.request.*;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final HttpSession session;

    @Operation(summary = "회원가입", description = "회원가입 합니다.")
    @PostMapping("/signup")
    public ResponseEntity<?> createMember(@RequestBody MemberCreateRequest memberCreateRequest){
        return ResponseEntity.status(HttpStatus.OK).body(memberService.createMember(memberCreateRequest));
    }

    @Operation(summary = "로그인", description = "로그인 합니다.")
    @PostMapping("/login")
    public ResponseEntity<?> loginMember(@RequestBody MemberLoginRequest memberLoginRequest) {
        Member member = memberService.loginMember(memberLoginRequest);
        session.setAttribute("memberId", member.getId());
        return ResponseEntity.status(HttpStatus.OK).body(memberService.selectedRadishMember(member));
    }

    @Operation(summary = "중복 이메일 확인", description = "이메일 중복되었는지 확인하기")
    @PostMapping("/email")
    public ResponseEntity<?> checkEmailMember(@RequestBody MemberCheckEmailRequest memberCheckEmailRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(memberService.checkEmailMember(memberCheckEmailRequest));
    }

    @Operation(summary = "맴버 정보 가져오기", description = "맴버 정보 가져오기.")
    @GetMapping
    public ResponseEntity<?> getMember(@AuthenticationPrincipal Member member) {
        return ResponseEntity.status(HttpStatus.OK).body(memberService.getMember(member));
    }

    @Operation(summary = "맴버 정보 수정하기", description = "맴버에 대한 정보 수정하기")
    @PatchMapping
    public ResponseEntity<?> changeMember(@AuthenticationPrincipal Member member, @RequestBody MemberChangeRequest memberChangeRequest) {
        memberService.changeMember(member, memberChangeRequest);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @Operation(summary = "맴버 비밀번호 수정하기", description = "맴버에 대한 비밀번호 수정하기")
    @PostMapping("pw")
    public ResponseEntity<?> changeMemberPw(@AuthenticationPrincipal Member member, @RequestBody MemberPwChangeRequest memberPwChangeRequest) {
        memberService.changeMemberPw(member, memberPwChangeRequest);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @Operation(summary = "맴버 무 가져오기", description = "맴버가 가지고 있는 무 모두 가져오기.")
    @GetMapping("/radish")
    public ResponseEntity<?> getMemberRadish(@AuthenticationPrincipal Member member) {
        return ResponseEntity.status(HttpStatus.OK).body(memberService.getMemberRadish(member));
    }

    @Operation(summary = "맴버 랜덤 무 뽑기", description = "맴버가 랜덤으로 무 뽑기")
    @PostMapping("/radish")
    public ResponseEntity<?> addMemberRadish(@AuthenticationPrincipal Member member) {
        memberService.addMemberRadish(member);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
