package com.im.moobeing.domain.radish.entity;

import java.util.List;

import com.im.moobeing.domain.member.entity.MemberRadish;
import com.im.moobeing.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "radish")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Radish extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "radish_id")
    private Long id;

    @Column(name = "radish_name", nullable = false, length = 200)
    private String radishName;

    @Column(name = "radish_image_url", nullable = true, length = 200)
    private String radishImageUrl;

    @Column(name = "radish_rank", nullable = true, length = 40)
    private String radishRank;

    @Column(name = "radish_message", nullable = true, length = 200)
    private String radishMessage;

    @OneToMany(mappedBy = "radish")
    private List<MemberRadish> memberRadishes;

    @Builder

    public Radish(Long id, String radishName, String radishImageUrl, String radishRank, String radishMessage) {
        this.id = id;
        this.radishName = radishName;
        this.radishImageUrl = radishImageUrl;
        this.radishRank = radishRank;
        this.radishMessage = radishMessage;
    }
}
