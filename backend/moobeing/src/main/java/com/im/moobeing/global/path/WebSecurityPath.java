package com.im.moobeing.global.path;

import lombok.Getter;

@Getter
public enum WebSecurityPath {
    REQUIRE_AUTH_PATH("/health/**", "member/logout", "member/info", "member/pw", "/board/**", "/comment/**", "/member", "/member/pw", "/member/radish", "/quiz/**", "/member/select", "/credit/**", "/loan/**", "/expense/**");

    private final String[] paths;

    WebSecurityPath(String... paths) {
        this.paths = paths;
    }
}