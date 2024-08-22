package com.im.moobeing.domain.member.controller;

import com.im.moobeing.domain.member.dto.request.MemberCreateRequest;
import com.im.moobeing.domain.member.dto.request.MemberLoginRequest;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final HttpSession session;

    @Operation(summary = "회원가입", description = "회원가입 합니다.")
    @GetMapping("/signup")
    public ResponseEntity<?> createMember(@RequestBody MemberCreateRequest memberCreateRequest){
        return ResponseEntity.status(HttpStatus.OK).body(memberService.createMember(memberCreateRequest));
    }

    @Operation(summary = "로그인", description = "로그인 합니다.")
    @GetMapping("/login")
    public ResponseEntity<?> loginMember(@RequestBody MemberLoginRequest memberLoginRequest) {
        Member member = memberService.loginMember(memberLoginRequest);
        session.setAttribute("memberId", member.getId());
        return ResponseEntity.status(HttpStatus.OK).body(member);
    }
}
