package com.im.moobeing.domain.quiz.service;

import com.im.moobeing.domain.expense.dto.response.ExpenseCategoryResponse;
import com.im.moobeing.domain.expense.service.ExpenseService;
import com.im.moobeing.domain.member.service.MemberService;
import com.im.moobeing.domain.quiz.entity.Quiz;
import com.im.moobeing.domain.quiz.entity.QuizInputAnswer;
import com.im.moobeing.domain.quiz.entity.QuizStatus;
import com.im.moobeing.domain.quiz.repository.QuizRepository;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.AuthenticationException;
import com.im.moobeing.global.error.exception.EntityNotFoundException;
import java.util.List;

import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.domain.quiz.dto.request.QuizAnswerRequest;
import com.im.moobeing.domain.quiz.dto.response.QuizAnswerResponse;
import com.im.moobeing.domain.quiz.dto.response.QuizColdResponse;
import com.im.moobeing.domain.quiz.dto.response.QuizDetailResponse;
import com.im.moobeing.domain.quiz.dto.response.QuizResponse;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QuizService {

	private static final Logger log = LoggerFactory.getLogger(QuizService.class);
	private final MemberService memberService;
	private final ExpenseService expenseService;
	private final QuizRepository quizRepository;

	@Transactional(readOnly = true)
	public List<QuizResponse> getQuizAll(Member member)
	{
		return quizRepository.findAllByMember(member)
							 .stream()
							 .map(QuizResponse::from)
							 .toList();
	}

	@Transactional(readOnly = true)
	public QuizDetailResponse getQuiz(Member member) {
		// 해당 번호에 대한 퀴즈가 없을때
		Quiz quiz = quizRepository.findByStatusAndMember(QuizStatus.NOT_STARTED, member)
								  .orElseThrow(() -> new EntityNotFoundException(
									  ErrorCode.QZ_NOT_FOUND_QUIZ));
		// 다른 사람의 퀴즈에 대한 접근을 요청할때
		if (!(quiz.getMember().getId().equals(member.getId()))){
			throw new AuthenticationException(ErrorCode.QZ_UNAUTHORIZED);
		}
		return QuizDetailResponse.from(quiz);
	}

	@Transactional(readOnly = true)
	public QuizColdResponse getQuizCold(Member member) {
		return QuizColdResponse.from(quizRepository.existsByMemberAndStatus(member, QuizStatus.NOT_STARTED));
	}

	@Transactional
	public QuizAnswerResponse confirmQuizAnswer(Member member, long quizNum, QuizAnswerRequest quizAnswerRequest) {
		// 해당 번호에 대한 퀴즈가 없을때
		Quiz quiz = quizRepository.findByQuizId(quizNum)
								  .orElseThrow(() -> new EntityNotFoundException(
									  ErrorCode.QZ_NOT_FOUND_QUIZ));
		// 다른 사람의 퀴즈에 대한 접근을 요청할때
		if (!(quiz.getMember().getId().equals(member.getId()))){
			throw new AuthenticationException(ErrorCode.QZ_UNAUTHORIZED);
		}
		// 정답이 예시보다 크고 사용자도 같은 응답을 했을 경우
		if (quiz.getAnswer() >= quiz.getExample() && quizAnswerRequest.answer().equals(QuizInputAnswer.UP.getDisplayName()) ){
			quiz.updateCorrect(true);
		}else if (quiz.getAnswer() <= quiz.getExample() && quizAnswerRequest.answer().equals(QuizInputAnswer.DOWN.getDisplayName())){
			quiz.updateCorrect(true);
		}
		quizRepository.save(quiz);
		return QuizAnswerResponse.from(quiz);
	}


	@Transactional
	public void createQuiz(Member member){
		List<ExpenseCategoryResponse> expenseForQuiz = expenseService.getExpenseForQuiz(member);
		if (expenseForQuiz.isEmpty()) {
			return;
		}
		Random random = new Random();
		int randomIdx = random.nextInt(expenseForQuiz.size());
		ExpenseCategoryResponse expenseCategory = expenseForQuiz.get(randomIdx);
		// 퀴즈 결과를 랜덤으로 생성 0 -> up, 1 -> down
		int upOrDown = random.nextInt(2);
		// up 일 경우
		int answer = expenseCategory.getTotalPrice();
		int example;
		if (upOrDown % 2 == 0){
			// 10 % 더한 금액을 퀴즈 예시로 설정
			example = (int)(expenseCategory.getTotalPrice() * 1.1);
		}else {
			// 10 % 뺀 금액을 퀴즈 예시로 설정
			example = (int)(expenseCategory.getTotalPrice() * 0.9);
		}
		Quiz quiz = Quiz.builder()
						.member(member)
						.status(QuizStatus.NOT_STARTED)
						.example(example)
						.answer(answer)
						.build();
		quizRepository.save(quiz);
	}


	// 4 시 00 분에 이루어지는 스케쥴링
	@Transactional
	@Scheduled(cron = "0 0 4 * * MON")
	public void quizScheduler(){
		log.info("SCHEDULER WORKING");
		// 모든 회원들에게 퀴즈 1개씩 생성
		memberService.getAllMembers()
			.forEach(this::createQuiz);
	}

	@Transactional
	@Scheduled(cron = "0 0 0 * * MON")
	public void quizExpire(){
		log.info("SCHEDULER Expire");
		// 이전에 있던 모든 퀴즈들 만료 시키기
		quizRepository.updateAllByStatus(QuizStatus.EXPIRED);
	}

}
