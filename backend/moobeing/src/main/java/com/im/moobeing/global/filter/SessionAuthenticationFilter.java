package com.im.moobeing.global.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

public class SessionAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        HttpSession session = request.getSession(false); // 기존 세션 가져오기, 없으면 null 반환

        if (session == null) {
            throw new ServletException("No JSESSIONID cookie found, unauthorized access."); // 예외 발생
        }

        String username = (String) session.getAttribute("username"); // 세션에서 사용자 이름 가져오기
        if (username != null) {
            // 사용자의 권한 설정, 실제 상황에 맞게 조정 필요
            SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_USER");
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, null, Collections.singletonList(authority));

            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(auth); // SecurityContext에 인증 정보 등록
        }

        filterChain.doFilter(request, response); // 다음 필터로 요청 전달
    }
}
