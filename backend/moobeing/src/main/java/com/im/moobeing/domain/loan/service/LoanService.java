package com.im.moobeing.domain.loan.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.im.moobeing.domain.loan.dto.GetAllLoanMapDto;
import com.im.moobeing.domain.loan.dto.GetMemberLoanDto;
import com.im.moobeing.domain.loan.dto.response.GetAllLoanMapResponse;
import com.im.moobeing.domain.loan.dto.response.GetLoanMapResponse;
import com.im.moobeing.domain.loan.dto.response.GetMemberLoanResponse;
import com.im.moobeing.domain.loan.dto.response.GetMonthlyLoanResponse;
import com.im.moobeing.domain.loan.dto.response.GetPercentLoanResponse;
import com.im.moobeing.domain.loan.dto.response.GetSumLoanResponse;
import com.im.moobeing.domain.loan.entity.AverageLoanRepaymentRecord;
import com.im.moobeing.domain.loan.entity.LoanProduct;
import com.im.moobeing.domain.loan.entity.LoanRepaymentRecord;
import com.im.moobeing.domain.loan.entity.MemberLoan;
import com.im.moobeing.domain.loan.repository.AverageLoanRepaymentRecordRepository;
import com.im.moobeing.domain.loan.repository.LoanProductRepository;
import com.im.moobeing.domain.loan.repository.LoanRepaymentRecordRepository;
import com.im.moobeing.domain.loan.repository.MemberLoanRepository;
import com.im.moobeing.domain.member.entity.Member;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LoanService {

	private final LoanRepaymentRecordRepository loanRepaymentRecordRepository;
	private final LoanProductRepository loanProductRepository;
	private final AverageLoanRepaymentRecordRepository averageLoanRepaymentRecordRepository;
	private final MemberLoanRepository memberLoanRepository;

	private static final int CURRENT_YEAR = 2024;

	public GetMemberLoanResponse getMemberLoan(Member member, String sort) {
		// Member ID로 MemberLoan을 조회
		List<MemberLoan> memberLoan = memberLoanRepository.findAllByMemberId(member.getId());

		List<GetMemberLoanDto> getMemberLoanDtoList = new ArrayList<>();

		Long totalLoanAmount = 0L;

		for (MemberLoan loan : memberLoan) {
			if(loan.getRemainingBalance() == 0){
				continue;
			}

			LoanProduct product = loanProductRepository.findByLoanName(loan.getLoanProductName())
				.orElseThrow(() -> new RuntimeException("todo error"));

			getMemberLoanDtoList.add(
				GetMemberLoanDto.of(loan, product)
			);

			totalLoanAmount += loan.getRemainingBalance();
		}

		if (sort.equals("rate")) {
			getMemberLoanDtoList.sort(Comparator.comparing(GetMemberLoanDto::getInterestRate).reversed());
		} else if (sort.equals("amount")) {
			getMemberLoanDtoList.sort(Comparator.comparing(GetMemberLoanDto::getRemainingBalance).reversed());
		}

		return GetMemberLoanResponse.of(totalLoanAmount, getMemberLoanDtoList);
	}

	public GetLoanMapResponse getLoanMap(Member member, String reqProductName) {
		MemberLoan memberLoan = memberLoanRepository.findByMemberIdAndLoanProductName(member.getId(), reqProductName)
				.orElseThrow(() -> new RuntimeException("todo memberLoan 없음"));

		List<LoanRepaymentRecord> loanRepaymentRecordList = loanRepaymentRecordRepository.findAllByMemberLoanId(memberLoan.getId());

		long totalLoanBalance = memberLoan.getInitialBalance();

		List<GetAllLoanMapDto> getAllLoanMapDtoList = new ArrayList<>();

		for (LoanRepaymentRecord record : loanRepaymentRecordList) {
			totalLoanBalance -= record.getRepaymentBalance();

			getAllLoanMapDtoList.add(GetAllLoanMapDto.builder()
					.year(record.getYear())
					.month(record.getMonth())
					.loanBalance(totalLoanBalance)
					.build());
		}

		// 필요에 따라 GetLoanMapResponse를 생성하고 반환
		return GetLoanMapResponse.of(getAllLoanMapDtoList);
	}

	public GetAllLoanMapResponse getAllLoanMap(Member member) {
		// 1. 주어진 Member에 대한 모든 MemberLoan을 가져옴
		List<MemberLoan> memberLoanList = memberLoanRepository.findAllByMemberId(member.getId());
		int minYear = 10000;
		int minMonth = 40;
		int maxYear = 0;
		int maxMonth = 0;
		long totalLoanBalance = 0;
		// 2. memberLoanList에서 가장 빠른 year, month와 가장 늦은 year, month를 찾는다.
		for (MemberLoan loan : memberLoanList) {
			if (maxYear < loan.getStartYear()) {
				maxYear = loan.getStartYear();
				maxMonth = loan.getStartMonth();
			} else if (maxYear == loan.getStartYear()) {
				maxMonth = Math.max(maxMonth, loan.getStartMonth());
			}
			if (minYear > loan.getStartYear()) {
				minYear = loan.getStartYear();
				minMonth = loan.getStartMonth();
			} else if (minYear == loan.getStartYear()) {
				minMonth = Math.min(loan.getStartMonth(), minMonth);
			}
		}
		int startYear = minYear;
		int startMonth = minMonth;
		final int tmpYear = startYear;
		final int tmpMonth = startMonth;

		// 목표 연도와 월을 설정 (2024년 8월)
		final int targetYear = 2024;
		final int targetMonth = 8;

		List<LoanRepaymentRecord> loanRepaymentRecordList = new ArrayList<>();
		for (MemberLoan loan : memberLoanList) {
			loanRepaymentRecordList.addAll(loanRepaymentRecordRepository.findAllByMemberLoanId(loan.getId()));
		}
		List<GetAllLoanMapDto> getAllLoanMapDtoList = new ArrayList<>();
		// 3. 첫 대출 시점부터 2024년 8월까지 매월 기록을 추가
		while (startYear < targetYear || (startYear == targetYear && startMonth <= targetMonth)) {
			// 해당 월에 상환 기록이 있는지 확인
			final int currentYear = startYear;
			final int currentMonth = startMonth;
			LoanRepaymentRecord recordForMonth = loanRepaymentRecordList.stream()
				.filter(record -> record.getYear() == currentYear && record.getMonth() == currentMonth)
				.findFirst()
				.orElse(null);
			// 대출 시작 시점에 맞춰 InitialBalance를 추가
			for (MemberLoan loan : memberLoanList) {
				if (loan.getStartYear() == startYear && loan.getStartMonth() == startMonth) {
					totalLoanBalance += loan.getInitialBalance();
				}
			}
			// 상환 기록이 있다면, 잔액 갱신
			if (recordForMonth != null) {
				totalLoanBalance -= recordForMonth.getRepaymentBalance();
			}
			// 현재의 year, month, loanBalance 값을 리스트에 추가
			getAllLoanMapDtoList.add(GetAllLoanMapDto.builder()
				.year(startYear)
				.month(startMonth)
				.loanBalance(totalLoanBalance)
				.build());
			// 다음 달로 넘어가기 위한 계산
			if (startMonth == 12) {
				startMonth = 1;
				startYear++;
			} else {
				startMonth++;
			}
		}
		// 필요한 응답 객체를 생성하고 반환
		return GetAllLoanMapResponse.of(getAllLoanMapDtoList);
	}


	public GetSumLoanResponse getSumLoan(Member member) {
		// 주어진 Member에 대한 모든 MemberLoan 가져오기
		List<MemberLoan> memberLoanList = memberLoanRepository.findAllByMemberId(member.getId());

		// remainingBalance 합계 계산
		int sum = 0;
		for (MemberLoan memberLoan : memberLoanList) {
			if (memberLoan.getRemainingBalance() != null) {
				sum += memberLoan.getRemainingBalance();
			}
		}

		// GetSumLoanResponse 생성 및 반환
		return GetSumLoanResponse.of(sum);
	}

	public List<LoanRepaymentRecord> getBuddyLoanMap(Member member, String loanName) {
		// age와 loanName, month 범위에 맞는 AverageLoanRepaymentRecord 리스트 가져오기
		List<AverageLoanRepaymentRecord> averageLoanRepaymentRecordList =
				averageLoanRepaymentRecordRepository.findByAgeAndLoanNameAndMonthRange(
						CURRENT_YEAR - Integer.parseInt(member.getBirthday().substring(0,2)),
						loanName,
						1,  // startMonth를 1로 고정
						12); // endMonth를 12로 고정하여 전체 연도 범위로 검색

		if (averageLoanRepaymentRecordList.isEmpty()) {
			throw new RuntimeException("No matching loan repayment records found for the specified criteria.");
		}

		// memberLoanId 기준으로 LoanRepaymentRecord 리스트 가져오기
		List<LoanRepaymentRecord> loanRepaymentRecordList = loanRepaymentRecordRepository.findAllByMemberLoanId(member.getId());

		// 필터링된 LoanRepaymentRecord 리스트 반환 (페이징 없이 전체 리스트 반환)
		return loanRepaymentRecordList;
	}


	public GetMonthlyLoanResponse getMonthlyLoan(Member member) {
		List<MemberLoan> memberLoanList = memberLoanRepository.findAllByMemberId(member.getId());

		Long monthlyLoanAmount = 0L;

		for (MemberLoan memberLoan : memberLoanList) {
			if(memberLoan.getRemainingBalance() == 0){
				continue;
			}

			LoanProduct product = loanProductRepository.findByLoanName(memberLoan.getLoanProductName())
				.orElseThrow(()->new RuntimeException());

			monthlyLoanAmount += memberLoan.getInitialBalance() / product.getLoanPeriod();
		}

		return GetMonthlyLoanResponse.of(monthlyLoanAmount);
	}

	public GetPercentLoanResponse getPercentLoan(Member member) {
		List<MemberLoan> memberLoanList = memberLoanRepository.findAllByMemberId(member.getId());

		long totalLoanAmount = 0L;
		long remainingLoanAmount = 0L;

		for (MemberLoan loan : memberLoanList) {
			if (loan.getRemainingBalance() == 0) {
				continue;
			}
			totalLoanAmount += loan.getInitialBalance();
			remainingLoanAmount += loan.getRemainingBalance();
		}

		// remainingPercent를 구함 (상환한 비율을 퍼센트로)
		double remainingPercent = 0.0;
		if (totalLoanAmount > 0) {
			remainingPercent = ((double) remainingLoanAmount / totalLoanAmount) * 100;
		}

		// remainingPercent를 반환
		return GetPercentLoanResponse.of(remainingPercent);
	}
}
