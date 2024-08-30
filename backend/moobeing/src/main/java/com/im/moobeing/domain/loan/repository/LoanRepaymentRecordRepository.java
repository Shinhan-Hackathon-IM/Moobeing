package com.im.moobeing.domain.loan.repository;

import com.im.moobeing.domain.loan.entity.LoanRepaymentRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepaymentRecordRepository extends JpaRepository<LoanRepaymentRecord, Long> {
	List<LoanRepaymentRecord> findAllByMemberLoanId(Long memberLoanId);

    // 이 날짜에 상환한 내역이 있는 지 확인해주는 query 문 작성
    boolean existsByMemberLoanIdAndYearAndMonth(Long id, int year, int month);
}
