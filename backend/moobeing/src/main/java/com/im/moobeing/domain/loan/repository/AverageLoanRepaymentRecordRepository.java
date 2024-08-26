package com.im.moobeing.domain.loan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.im.moobeing.domain.loan.entity.AverageLoanRepaymentRecord;

public interface AverageLoanRepaymentRecordRepository extends JpaRepository<AverageLoanRepaymentRecord, Long> {
	@Query("SELECT a FROM AverageLoanRepaymentRecord a WHERE a.age = :age AND a.loanName = :loanName AND a.month BETWEEN :startMonth AND :endMonth")
	List<AverageLoanRepaymentRecord> findByAgeAndLoanNameAndMonthRange(
		@Param("age") int age,
		@Param("loanName") String loanName,
		@Param("startMonth") int startMonth,
		@Param("endMonth") int endMonth);
}
