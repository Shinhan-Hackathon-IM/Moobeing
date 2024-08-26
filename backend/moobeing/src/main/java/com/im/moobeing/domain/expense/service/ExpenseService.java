package com.im.moobeing.domain.expense.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import com.im.moobeing.domain.expense.dto.request.ExpenseCreateRequest;
import com.im.moobeing.domain.expense.dto.response.ExpenseHistoryResponse;
import com.im.moobeing.domain.expense.entity.Expense;
import com.im.moobeing.domain.expense.entity.ExpenseCategory;
import com.im.moobeing.domain.expense.repository.ExpenseCategoryRepository;
import com.im.moobeing.domain.expense.repository.ExpenseRepository;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.im.moobeing.domain.expense.dto.response.ExpenseCategoryResponse;
import com.im.moobeing.domain.expense.dto.response.ExpenseDateResponse;
import com.im.moobeing.domain.member.entity.Member;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExpenseService {

	private final ExpenseRepository expenseRepository;
	private final ExpenseCategoryRepository expenseCategoryRepository;

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
						Collectors.mapping(ExpenseHistoryResponse::from, Collectors.toList())
				));

		return groupedByDate.entrySet().stream()
				.map(entry -> ExpenseDateResponse.of(entry.getKey(), entry.getValue()))
				.collect(Collectors.toList());
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
		log.error(request.getTitle());
		Expense expense = Expense.builder()
				.member(member)
				.title(request.getTitle())
				.price(request.getPrice())
				.expenseCategory(expenseCategory)
				.expenseDate(request.getLocalDate().atStartOfDay())
				.build();
		log.error(expense.getTitle());
		expenseRepository.save(expense);
	}
}
