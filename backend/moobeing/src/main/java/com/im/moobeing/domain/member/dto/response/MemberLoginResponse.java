package com.im.moobeing.domain.member.dto.response;

import com.im.moobeing.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberLoginResponse {
    private String name;

    //todo 필요 있는 지 체크하기.
    public static MemberLoginResponse of(final Member member) {
        return MemberLoginResponse.builder()
                .name(member.getName())
                .build();
    }
}
