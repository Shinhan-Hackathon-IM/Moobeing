package com.im.moobeing.domain.member.repository;

import com.im.moobeing.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByHandle(String handle);
}
