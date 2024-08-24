package com.im.moobeing.domain.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberCreateRequest {
    private String handle;
    private String password;
    private String name;
    private String phoneNumber;
    private String gender;
    private String birthday;
}
