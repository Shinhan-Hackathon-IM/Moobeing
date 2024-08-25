package com.im.moobeing.domain.member.entity;

import com.im.moobeing.domain.member.dto.request.MemberChangeRequest;
import com.im.moobeing.domain.member.dto.request.MemberPwChangeRequest;
import com.im.moobeing.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Entity(name="member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Long id;

	@Column(name = "handle", nullable = false, length = 20)
	private String handle;

	@Column(name = "password", nullable = false, length = 20)
	private String password;

	@Column(name = "total_points", nullable = true)
	private Long totalPoints;

	@Column(name = "total_loan", nullable = true)
	private Long totalLoan;

	@Column(name = "name", nullable = true, length = 50)
	private String name;

	@Column(name = "phone_number", nullable = true, length = 50)
	private String phoneNumber;

	@Column(name = "gender", nullable = true, length = 10)
	private String gender;

	@Column(name = "birthday", nullable = true, length = 60)
	private String birthday;

	@Builder
	public Member(Long id, String handle, String password, Long totalPoints, Long totalLoan, String name, String phoneNumber, String gender, String birthday) {
		this.id = id;
		this.handle = handle;
		this.password = password;
		this.totalPoints = totalPoints;
		this.totalLoan = totalLoan;
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.gender = gender;
		this.birthday = birthday;
	}
}
