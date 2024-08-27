package com.im.moobeing.domain.loan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.im.moobeing.domain.loan.entity.LoanRepaymentRecord;

public interface LoanRepaymentRecordRepository extends JpaRepository<LoanRepaymentRecord, Long> {
	List<LoanRepaymentRecord> findAllByMemberLoanId(Long memberLoanId);
}
