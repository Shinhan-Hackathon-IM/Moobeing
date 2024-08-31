package com.im.moobeing.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.im.moobeing.domain.member.entity.MemberRadish;

public interface MemberRadishRepository extends JpaRepository<MemberRadish, Long> {
    MemberRadish findByMemberIdAndRadishId(Long memberId, Long RadishId);
}
