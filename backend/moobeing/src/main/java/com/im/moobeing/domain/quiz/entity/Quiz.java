package com.im.moobeing.domain.quiz.entity;

import java.time.LocalDateTime;

import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "quiz")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Quiz extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long quizId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private QuizStatus status;

	@Column
	private Boolean isCorrect;

	//TODO  ENUM or upAndDown Boolean 로 수정
	@Column
	private int answer;

	// 사용자에게 UP or DOWN 을 물어볼 값
	@Column
	private int example;

	@Column
	private LocalDateTime endedAt;

	@Builder
	private Quiz(Long quizId, Member member, QuizStatus status, int answer, int example) {
		this.quizId = quizId;
		this.member = member;
		this.status = status;
		this.answer = answer;
		this.example = example;
		this.isCorrect = false;
		this.endedAt = LocalDateTime.now().plusWeeks(1);
	}

	public void updateCorrect(Boolean isCorrect) {
		this.endedAt = LocalDateTime.now();
		this.isCorrect = isCorrect;
	}
}
