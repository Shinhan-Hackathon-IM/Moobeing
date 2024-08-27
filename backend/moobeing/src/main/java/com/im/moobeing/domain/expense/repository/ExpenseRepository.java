package com.im.moobeing.domain.expense.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.im.moobeing.domain.expense.entity.Expense;
import com.im.moobeing.domain.member.entity.Member;

import feign.Param;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
	//TODO : N+1처리를 위한 fetch join 필(category)

    @Query("SELECT e FROM Expense e JOIN FETCH e.expenseCategory WHERE e.member = :member AND YEAR(e.expenseDate) = :year AND MONTH(e.expenseDate) = :month")
    List<Expense> findAllByMemberAndYearAndMonth(@Param("member") Member member, @Param("year") int year, @Param("month") int month);

    List<Expense> findAllByExpenseDateBetween(LocalDateTime expenseDate, LocalDateTime expenseDate2);
}
