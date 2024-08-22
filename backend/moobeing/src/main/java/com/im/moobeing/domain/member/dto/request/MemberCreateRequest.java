package com.im.moobeing.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberCreateRequest {
    private String handle;
    private String password;
    private Long totalPoints;
    private Long totalLoan;
    private String name;
    private String phoneNumber;
    private String gender;
    private String email;
    private String birthday;
}
