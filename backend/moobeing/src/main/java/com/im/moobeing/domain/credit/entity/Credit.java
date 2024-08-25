package com.im.moobeing.domain.credit.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name="credit")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Credit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "credit_id")
    private Long id;

    @Column(name = "email", nullable = false, length = 20)
    private String email;

    @Column(name = "password", nullable = false, length = 20)
    private String password;

}
