package com.im.moobeing.domain.expense.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.im.moobeing.domain.expense.dto.GetCategoryListDto;
import com.im.moobeing.domain.expense.dto.GetDrawPiChartDto;
import com.im.moobeing.domain.expense.dto.request.ExpenseCreateRequest;
import com.im.moobeing.domain.expense.dto.response.ExpenseCategoryResponse;
import com.im.moobeing.domain.expense.dto.response.ExpenseDateResponse;
import com.im.moobeing.domain.expense.dto.response.ExpenseHistoryResponse;
import com.im.moobeing.domain.expense.dto.response.GetDrawPiChartResponse;
import com.im.moobeing.domain.expense.entity.Expense;
import com.im.moobeing.domain.expense.entity.ExpenseCategory;
import com.im.moobeing.domain.expense.repository.ExpenseCategoryRepository;
import com.im.moobeing.domain.expense.repository.ExpenseRepository;
import com.im.moobeing.domain.loan.entity.LoanRepaymentRecord;
import com.im.moobeing.domain.loan.entity.MemberLoan;
import com.im.moobeing.domain.loan.repository.LoanProductRepository;
import com.im.moobeing.domain.loan.repository.LoanRepaymentRecordRepository;
import com.im.moobeing.domain.loan.repository.MemberLoanRepository;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.BadRequestException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExpenseService {

	private final ExpenseRepository expenseRepository;
	private final ExpenseCategoryRepository expenseCategoryRepository;
	private final MemberLoanRepository memberLoanRepository;
	private final LoanRepaymentRecordRepository loanRepaymentRecordRepository;
	private final LoanProductRepository loanProductRepository;

	public List<ExpenseCategoryResponse> getExpenseCategory(Member member, Integer year, Integer month) {
		validateDate(year, month);
		List<Expense> expenses = expenseRepository.findAllByMemberAndYearAndMonth(member, year, month);

		Map<String, Integer> totalExpensesByCategory = expenses.stream()
				.collect(Collectors.groupingBy(
						expense -> expense.getExpenseCategory().getName(),
						Collectors.summingInt(Expense::getPrice) // 각 카테고리의 총 금액 합산
				));

		return totalExpensesByCategory.entrySet().stream()
				.map(entry -> ExpenseCategoryResponse.builder()
						.categoryName(entry.getKey())
						.totalPrice(entry.getValue())
						.build())
				.collect(Collectors.toList());
	}

	public List<ExpenseDateResponse> getExpenseAllByDate(Member member, Integer year, Integer month) {
		validateDate(year, month);

		List<Expense> expenses = expenseRepository.findAllByMemberAndYearAndMonth(member, year, month);

		Map<LocalDate, List<ExpenseHistoryResponse>> groupedByDate = expenses.stream()
				.filter(expense -> !Objects.isNull(expense.getExpenseDate())) // expenseDate가 nullable
				.collect(Collectors.groupingBy(
						expense -> expense.getExpenseDate().toLocalDate(),
						Collectors.mapping(ExpenseHistoryResponse::of, Collectors.toList())
				));

		List<ExpenseDateResponse> expenseDateResponses = groupedByDate.entrySet().stream()
				.map(entry -> ExpenseDateResponse.of(entry.getKey(), entry.getValue()))
				.collect(Collectors.toList());

		List<MemberLoan> memberLoans = memberLoanRepository.findAllByMemberId(member.getId());

		List<LoanRepaymentRecord> loanRepaymentRecords = new ArrayList<>();

		for (MemberLoan memberLoan : memberLoans) {
			loanRepaymentRecords.addAll(loanRepaymentRecordRepository.findAllByMemberLoanId(memberLoan.getId()));
		}

		//todo 여기서 date에 맞는 것과 history에 맞는 것들을 추가해야함. 한바퀴 돌면서 해당 일에 맞는 것들을 찾는다.
		for (ExpenseDateResponse expenseDateResponse : expenseDateResponses) {
			for (LoanRepaymentRecord loanRepaymentRecord : loanRepaymentRecords) {
				if (expenseDateResponse.getDate().getDayOfMonth() == loanRepaymentRecord.getDay() &&
					expenseDateResponse.getDate().getMonthValue() == loanRepaymentRecord.getMonth() &&
					expenseDateResponse.getDate().getYear() == loanRepaymentRecord.getYear()){
					MemberLoan memberLoan = memberLoanRepository.findById(loanRepaymentRecord.getMemberLoanId())
						.orElseThrow(()->new RuntimeException("todo"));
					String title = memberLoan.getLoanProductName() + " 상환";
					int price = Math.toIntExact(loanRepaymentRecord.getRepaymentBalance());
					expenseDateResponse.getHistory().add(ExpenseHistoryResponse.from(title,"대출", price));
				}
			}
		}

		return expenseDateResponses;
	}

	private void validateDate(Integer year, Integer month) {
		if (Objects.isNull(year) || Objects.isNull(month) || month < 1 || month > 12) {
			throw new BadRequestException(ErrorCode.BAD_REQUEST);
		}
	}

	public void createExpense(Member member, ExpenseCreateRequest request) {
		ExpenseCategory expenseCategory = expenseCategoryRepository.findByName(request.getCategory())
				.orElseGet(() -> {
					ExpenseCategory category = ExpenseCategory.builder().name(request.getCategory()).build();
					return expenseCategoryRepository.save(category);
				});
		Expense expense = Expense.builder()
				.member(member)
				.title(request.getTitle())
				.price(request.getPrice())
				.expenseCategory(expenseCategory)
				.expenseDate(request.getLocalDate().atStartOfDay())
				.build();
		expenseRepository.save(expense);
	}

	//todo 여기서 각 계좌의
	public GetDrawPiChartResponse drawPiChart(Member member, Integer year, Integer month) {
		validateDate(year, month);

		List<Expense> expenses = expenseRepository.findAllByMemberAndYearAndMonth(member, year, month);

		long foodAmount = 0;
		long loanAmount = 0;
		long cultureAmount = 0;
		long entertainmentAmount = 0;
		long transportAmount= 0;
		long healthAmount = 0;

		List<GetDrawPiChartDto> getDrawPiChartDtoList = new ArrayList<>();
		List<GetCategoryListDto> getCategoryListDtoList = new ArrayList<>();

		for (Expense expense : expenses) {
			String categoryName = expense.getExpenseCategory().getName();

			if (categoryName.equals("식비")) {
				foodAmount += expense.getPrice(); // 식비 금액 합산
			} else if (categoryName.equals("대출")) {
				loanAmount += expense.getPrice(); // 대출 금액 합산
			} else if (categoryName.equals("문화")) {
				cultureAmount += expense.getPrice(); // 문화 금액 합산
			} else if (categoryName.equals("유흥")) {
				entertainmentAmount += expense.getPrice(); // 유흥 금액 합산
			} else if (categoryName.equals("교통")) {
				transportAmount += expense.getPrice(); // 교통 금액 합산
			} else if (categoryName.equals("건강")) {
				healthAmount += expense.getPrice(); // 건강 금액 합산
			} else {
				// 기타 카테고리 처리 (선택 사항)
			}
		}

		getDrawPiChartDtoList.add(
			GetDrawPiChartDto.of("식비", "식비", foodAmount, "hsl(190, 70%, 50%)")
		);
		getDrawPiChartDtoList.add(
			GetDrawPiChartDto.of("대출", "대출", loanAmount, "hsl(250, 70%, 50%)")
		);
		getDrawPiChartDtoList.add(
			GetDrawPiChartDto.of("문화", "문화", cultureAmount, "hsl(234, 70%, 50%)")
		);
		getDrawPiChartDtoList.add(
			GetDrawPiChartDto.of("유흥", "유흥", entertainmentAmount, "hsl(198, 70%, 50%)")
		);
		getDrawPiChartDtoList.add(
			GetDrawPiChartDto.of("교통", "교통", transportAmount, "hsl(117, 70%, 50%)")
		);
		getDrawPiChartDtoList.add(
			GetDrawPiChartDto.of("건강", "건강", healthAmount, "hsl(61, 96%, 81%)")
		);

		// 각각의 퍼센트를 구해야 함.
		long totalAmount = foodAmount + loanAmount + cultureAmount + entertainmentAmount + transportAmount + healthAmount;

		double foodPercent = (totalAmount > 0) ? ((double) foodAmount / totalAmount) * 100 : 0;
		double loanPercent = (totalAmount > 0) ? ((double) loanAmount / totalAmount) * 100 : 0;
		double culturePercent = (totalAmount > 0) ? ((double) cultureAmount / totalAmount) * 100 : 0;
		double entertainmentPercent = (totalAmount > 0) ? ((double) entertainmentAmount / totalAmount) * 100 : 0;
		double transportPercent = (totalAmount > 0) ? ((double) transportAmount / totalAmount) * 100 : 0;
		double healthPercent = (totalAmount > 0) ? ((double) healthAmount / totalAmount) * 100 : 0;

		getCategoryListDtoList.add(
			GetCategoryListDto.of("식비", foodPercent, foodAmount)
		);
		getCategoryListDtoList.add(
			GetCategoryListDto.of("대출", loanPercent, loanAmount)
		);
		getCategoryListDtoList.add(
			GetCategoryListDto.of("문화", culturePercent, cultureAmount)
		);
		getCategoryListDtoList.add(
			GetCategoryListDto.of("유흥", entertainmentPercent, entertainmentAmount)
		);
		getCategoryListDtoList.add(
			GetCategoryListDto.of("교통", transportPercent, transportAmount)
		);
		getCategoryListDtoList.add(
			GetCategoryListDto.of("건강", healthPercent, healthAmount)
		);

		return GetDrawPiChartResponse.of(getDrawPiChartDtoList, getCategoryListDtoList);
	}

	/**
	 * Quiz 생성을 위해 회원의 1주일간 카테고리 별 지출 정보를 가져오는 메서다
	 * @param member 해당 회원
	 * @return 회원의 1주일간 카테고리 별 지출 정보
	 */
	public List<ExpenseCategoryResponse> getExpenseForQuiz(Member member) {
		// 1일전 ~ 7일전 까지의 지출 정보를 가져온다.
		// 오늘을 포함시킬 경우 지출 내용에 변경이 생길 수 있다.
		LocalDate today = LocalDate.now().minusDays(1);
		LocalDate from = LocalDate.now().minusDays(7);
		List<Expense> expenses = expenseRepository.findAllByExpenseDateBetween(from.atStartOfDay(), today.atStartOfDay());

		Map<String, Integer> totalExpensesByCategory = expenses.stream()
			.collect(Collectors.groupingBy(
				expense -> expense.getExpenseCategory().getName(),
				Collectors.summingInt(Expense::getPrice) // 각 카테고리의 총 금액 합산
			));

		return totalExpensesByCategory.entrySet().stream()
			.map(entry -> ExpenseCategoryResponse.builder()
				.categoryName(entry.getKey())
				.totalPrice(entry.getValue())
				.build())
			.collect(Collectors.toList());
	}
}
