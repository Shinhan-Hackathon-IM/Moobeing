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
import java.util.List;

@Entity(name="member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "email", nullable = false, length = 40)
    private String email;

    @Column(name = "password", nullable = false, length = 20)
    private String password;

    @Column(name = "total_points", nullable = true)
    private Long totalPoints = 0L;

    @Column(name = "total_loan", nullable = true)
    private Long totalLoan = 0L;

    @Column(name = "name", nullable = true, length = 50)
    private String name;

    @Column(name = "gender", nullable = true, length = 10)
    private String gender;

    @Column(name = "birthday", nullable = true, length = 60)
    private String birthday;

    @Column(name = "user_key", nullable = true, length = 255)
    private String userKey;

    @Column(name = "month_aver", nullable = true, length = 255)
    private Long monthAver;

    @Column(name = "selected_radish_id", nullable = true)
    private Long selectedRadishId = 1L;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<MemberRadish> memberRadishes = new ArrayList<>();

    @Column
    private String account;

    @Builder
    public Member(Long id, String email, String password, Long totalPoints, Long totalLoan, String name, String gender, String birthday, String userKey, Long monthAver, Long selectedRadishId, String account) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.totalPoints = totalPoints;
        this.totalLoan = totalLoan;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.userKey = userKey;
        this.monthAver = monthAver;
        this.selectedRadishId = selectedRadishId;
        this.account = account;
    }

    public void changeMember(MemberChangeRequest memberChangeRequest){
        this.name = memberChangeRequest.getName();
    }

    public void changeMemberPw(MemberPwChangeRequest memberPwChangeRequest){
        this.password = memberPwChangeRequest.getNewPassword();
    }

    public void addMemberRadish(MemberRadish memberRadish) {
        this.memberRadishes.add(memberRadish);
    }

    public void setMemberUserKey(String userKey) {
        this.userKey = userKey;
    }

    public void setMemberRadishId(Long selectedRadishId) {
        this.selectedRadishId = selectedRadishId;
    }

    public void setMemberAccount(String account) { this.account = account; }
}
