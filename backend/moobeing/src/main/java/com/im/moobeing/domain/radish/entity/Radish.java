package com.im.moobeing.domain.radish.entity;

import com.im.moobeing.domain.member.entity.MemberRadish;
import com.im.moobeing.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


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

    @Column(name = "radish_image", nullable = true, length = 200)
    private String radishImage;

    @Column(name = "radish_rank", nullable = true, length = 40)
    private String radishRank;

    @OneToMany(mappedBy = "radish")
    private List<MemberRadish> memberRadishes;

    @Builder
    public Radish(Long id, String radishName, String radishImage, String radishRank) {
        this.id = id;
        this.radishName = radishName;
        this.radishImage = radishImage;
        this.radishRank = radishRank;
    }
}
