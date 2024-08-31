package com.im.moobeing.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StreamCntMemberResponse {
    private int streamCnt;

    public static StreamCntMemberResponse of (int streamCnt){
        return StreamCntMemberResponse.builder()
                .streamCnt(streamCnt)
                .build();
    }
}
