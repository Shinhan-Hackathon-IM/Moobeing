package com.im.moobeing.domain.loan.service;

import com.im.moobeing.domain.loan.dto.GetAllLoanMapDto;
import com.im.moobeing.domain.loan.dto.GetMemberLoanDto;
import com.im.moobeing.domain.loan.dto.response.*;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

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

		for (MemberLoan loan : memberLoan) {
			if(loan.getRemainingBalance() == 0){
				continue;
			}

			LoanProduct product = loanProductRepository.findByLoanName(loan.getLoanProductName())
				.orElseThrow(() -> new RuntimeException("todo error"));

			getMemberLoanDtoList.add(
				GetMemberLoanDto.of(loan, product)
			);
		}

		if (sort.equals("rate")) {
			getMemberLoanDtoList.sort(Comparator.comparing(GetMemberLoanDto::getInterestRate).reversed());
		} else if (sort.equals("amount")) {
			getMemberLoanDtoList.sort(Comparator.comparing(GetMemberLoanDto::getRemainingBalance).reversed());
		}

		return GetMemberLoanResponse.of(getMemberLoanDtoList);
	}

	public GetLoanMapResponse getLoanMap(Member member, String reqProductName, int reqPageNum) {
		MemberLoan memberLoan = memberLoanRepository.findByMemberIdAndLoanProductName(member.getId(), reqProductName)
			.orElseThrow(() -> new RuntimeException("todo memberLoan 없음"));

		List<LoanRepaymentRecord> loanRepaymentRecordList = loanRepaymentRecordRepository.findAllByMemberLoanId(memberLoan.getId());

		// 페이지네이션 로직
		int pageSize = 4;  // 페이지 당 항목 수 (4개씩 표시)
		int step = 3;  // 3칸씩 이동
		int pageNum = reqPageNum;  // 요청에서 페이지 번호 가져오기

		int fromIndex = (pageNum - 1) * step;
		int toIndex = Math.min(fromIndex + pageSize, loanRepaymentRecordList.size());

		if (fromIndex >= loanRepaymentRecordList.size()) {
			throw new RuntimeException("페이지 번호가 범위를 벗어났습니다.");
		}

		long maxLoanBalance = 0;
		long minLoanBalance = 0;
		long totalLoanBalance = 0;
		int start = 0;

		List<GetAllLoanMapDto> getAllLoanMapDtoList = new ArrayList<>();

		for (LoanRepaymentRecord record : loanRepaymentRecordList) {
			totalLoanBalance -= memberLoan.getInitialBalance() - record.getRepaymentBalance();
			if(start == 0) {
				maxLoanBalance = totalLoanBalance;
			}

			getAllLoanMapDtoList.add(GetAllLoanMapDto.builder()
				.year(record.getYear())
				.month(record.getMonth())
				.loanBalance(totalLoanBalance)
				.build());

			if(++start == 4){
				minLoanBalance = totalLoanBalance;
				break;
			}
		}

		// 필요에 따라 GetLoanMapResponse를 생성하고 반환
		return GetLoanMapResponse.of(maxLoanBalance, minLoanBalance, getAllLoanMapDtoList);
	}

	public GetAllLoanMapResponse getAllLoanMap(Member member, int pageNum) {
		// 1. 주어진 Member에 대한 모든 MemberLoan을 가져옴
		List<MemberLoan> memberLoanList = memberLoanRepository.findAllByMemberId(member.getId());

		int minYear = 10000;
		int minMonth = 40;

		// 2. memberLoanList 에서 가장 빠른 year, month 가 가장 작은 값을 찾는다.
		for(MemberLoan loan : memberLoanList) {
			if(minYear > loan.getStartYear()){
				minYear = loan.getStartYear();
				minMonth = loan.getStartMonth();
			} else if(minYear == loan.getStartYear()){
				minMonth = Math.min(loan.getStartMonth(), minMonth);
			}
		}

		int startYear = minYear;
		int startMonth = minMonth;

		int page = (pageNum - 1) * 3;

		startMonth += page;

		if (startMonth > 12){
			 startYear += startMonth / 12;
			 startMonth = startMonth % 12;
		}

		long[] totalLoan = new long[4];

		// 3. 전체 loan에 대한 대출받은 금액들 모두 합치기
		for(MemberLoan loan : memberLoanList) {
			if(startYear > loan.getStartYear()){
				totalLoan[0] += loan.getInitialBalance();
			} else if(startYear == loan.getStartYear()){
				if(startMonth >= loan.getStartMonth()){
					totalLoan[0] += loan.getInitialBalance();
				}
			}
		}

		List<LoanRepaymentRecord> loanRepaymentRecordList = new ArrayList<>();

		for(MemberLoan loan : memberLoanList) {
			loanRepaymentRecordList.addAll(loanRepaymentRecordRepository.findAllByMemberLoanId(loan.getId()));
		}

		for (LoanRepaymentRecord record : loanRepaymentRecordList) {
			if(startYear > record.getYear()){
				totalLoan[0] -= record.getRepaymentBalance();
			} else if(startYear == record.getYear()){
				if(startMonth >= record.getMonth()){
					totalLoan[0] -= record.getRepaymentBalance();
				}
			}
		}

		for (int i = 1; i < 4; i++){
			// 12 이상이면
			if (++startMonth > 12){
				startYear++;
				startMonth = 1;
			}

			totalLoan[i] = totalLoan[i-1];

			for(MemberLoan loan : memberLoanList) {
				if(loan.getStartYear() == startYear && loan.getStartMonth() == startMonth){
					totalLoan[i] += loan.getInitialBalance();
				}
			}

			for (LoanRepaymentRecord record : loanRepaymentRecordList) {
				if (startYear == record.getYear() && startMonth == record.getMonth()) {
					totalLoan[i] -= record.getRepaymentBalance();
				}
			}
		}

		startMonth -= 3;

		if (startMonth <= 0){
			startYear--;
			startMonth = startMonth + 12;
		}

		long maxLoanBalance = totalLoan[0];
		long minLoanBalance = totalLoan[0];

		for (int i = 1; i < totalLoan.length; i++) {
			if (totalLoan[i] > maxLoanBalance) {
				maxLoanBalance = totalLoan[i];
			}
			if (totalLoan[i] < minLoanBalance) {
				minLoanBalance = totalLoan[i];
			}
		}

		List<GetAllLoanMapDto> getAllLoanMapDtoList = new ArrayList<>();

		for (int i = 0; i < 4; i++){
			if (startMonth > 12){
				startYear++;
				startMonth = 1;
			}
			getAllLoanMapDtoList.add(GetAllLoanMapDto.builder()
				.year(startYear)
				.month(startMonth++)
				.loanBalance(totalLoan[i])
				.build());
		}

		return GetAllLoanMapResponse.of(maxLoanBalance, minLoanBalance, getAllLoanMapDtoList);
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

	public List<LoanRepaymentRecord> getBuddyLoanMap(Member member, String loanName, int reqPageNum) {
		int pageNum = reqPageNum;

		// pageNum에 따른 month 범위 설정
		int startMonth = (pageNum - 1) * 3 + 1;
		int endMonth = startMonth + 3;

		// age와 loanName, month 범위에 맞는 AverageLoanRepaymentRecord 리스트 가져오기
		List<AverageLoanRepaymentRecord> averageLoanRepaymentRecordList =
			averageLoanRepaymentRecordRepository.findByAgeAndLoanNameAndMonthRange(
				CURRENT_YEAR - Integer.parseInt(member.getBirthday().substring(0,2)),
					loanName,
				startMonth,
				endMonth);

		if (averageLoanRepaymentRecordList.isEmpty()) {
			throw new RuntimeException("No matching loan repayment records found for the specified criteria.");
		}

		// memberLoanId 기준으로 LoanRepaymentRecord 리스트 가져오기
		List<LoanRepaymentRecord> loanRepaymentRecordList = loanRepaymentRecordRepository.findAllByMemberLoanId(member.getId());

		// 페이지네이션 로직
		int pageSize = 4;  // 페이지 당 항목 수 (4개씩 표시)
		int step = 3;  // 3칸씩 이동

		int fromIndex = (pageNum - 1) * step;
		int toIndex = Math.min(fromIndex + pageSize, loanRepaymentRecordList.size());

		if (fromIndex >= loanRepaymentRecordList.size()) {
			throw new RuntimeException("페이지 번호가 범위를 벗어났습니다.");
		}

		// 필터링된 LoanRepaymentRecord 리스트 반환
		return loanRepaymentRecordList.subList(fromIndex, toIndex);
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
