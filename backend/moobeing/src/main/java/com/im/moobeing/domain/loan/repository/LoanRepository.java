package com.im.moobeing.domain.loan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.im.moobeing.domain.loan.entity.Loan;

public interface LoanRepository extends JpaRepository<Loan, Long> {
}
