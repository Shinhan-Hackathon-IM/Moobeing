package com.im.moobeing.domain.loan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.im.moobeing.domain.loan.entity.LoanProduct;

public interface LoanProductRepository extends JpaRepository<LoanProduct, Long> {
}
