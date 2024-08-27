package com.im.moobeing.domain.member.dto.response;

import com.im.moobeing.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberGetResponse {
    private String email;
    private String name;
    private String gender;
    private String birthday;

    public static MemberGetResponse of(final Member member) {
        return MemberGetResponse.builder()
                .email(member.getEmail())
                .name(member.getName())
                .gender(member.getGender())
                .birthday(member.getBirthday())
                .build();
    }
}
