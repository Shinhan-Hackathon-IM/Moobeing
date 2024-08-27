package com.im.moobeing.domain.expense.repository;

import com.im.moobeing.domain.expense.entity.ExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Long> {
    Optional<ExpenseCategory> findByName(String name);
}
