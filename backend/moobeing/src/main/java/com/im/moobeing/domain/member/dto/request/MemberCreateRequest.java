package com.im.moobeing.domain.member.dto.request;

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
