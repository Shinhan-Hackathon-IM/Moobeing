package com.im.moobeing.domain.loan.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.im.moobeing.domain.loan.dto.request.GetAllLoanMapRequest;
import com.im.moobeing.domain.loan.dto.request.GetBuddyLoanMapRequest;
import com.im.moobeing.domain.loan.dto.request.GetLoanMapRequest;
import com.im.moobeing.domain.loan.dto.response.GetSumLoanResponse;
import com.im.moobeing.domain.loan.entity.AverageLoanRepaymentRecord;
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

	public List<MemberLoan> getMemberLoan(Member member) {
		// Member ID로 MemberLoan을 조회
		return memberLoanRepository.findAllByMemberId(member.getId());
	}

	public List<LoanRepaymentRecord> getLoanMap(Member member, GetLoanMapRequest getLoanMapRequest) {
		MemberLoan memberLoan = memberLoanRepository.findByMemberIdAndLoanProductName(member.getId(), getLoanMapRequest.getLoanProductName())
			.orElseThrow(() -> new RuntimeException("todo memberLoan 없음"));

		List<LoanRepaymentRecord> loanRepaymentRecordList = loanRepaymentRecordRepository.findAllByMemberLoanId(memberLoan.getId());

		// 페이지네이션 로직
		int pageSize = 4;  // 페이지 당 항목 수 (4개씩 표시)
		int step = 3;  // 3칸씩 이동
		int pageNum = getLoanMapRequest.getPageNum();  // 요청에서 페이지 번호 가져오기

		int fromIndex = (pageNum - 1) * step;
		int toIndex = Math.min(fromIndex + pageSize, loanRepaymentRecordList.size());

		if (fromIndex >= loanRepaymentRecordList.size()) {
			throw new RuntimeException("페이지 번호가 범위를 벗어났습니다.");
		}

		// 필요에 따라 GetLoanMapResponse를 생성하고 반환
		return loanRepaymentRecordList.subList(fromIndex, toIndex);
	}

	public List<LoanRepaymentRecord> getAllLoanMap(Member member, GetAllLoanMapRequest getAllLoanMapRequest) {
		// 1. 주어진 Member에 대한 모든 MemberLoan을 가져옴
		List<MemberLoan> memberLoanList = memberLoanRepository.findAllByMemberId(member.getId());

		// 최종적으로 반환할 LoanRepaymentRecord 리스트를 저장할 곳
		List<LoanRepaymentRecord> combinedLoanRepaymentRecords = new ArrayList<>();

		// 2. 각 MemberLoan에 대해 LoanRepaymentRecord를 가져와서 리스트에 추가
		for (MemberLoan memberLoan : memberLoanList) {
			List<LoanRepaymentRecord> loanRepaymentRecordList = loanRepaymentRecordRepository.findAllByMemberLoanId(memberLoan.getId());
			combinedLoanRepaymentRecords.addAll(loanRepaymentRecordList);
		}
		// 페이지네이션 로직
		int pageSize = 4;  // 페이지 당 항목 수 (4개씩 표시)
		int step = 3;  // 3칸씩 이동
		int pageNum = getAllLoanMapRequest.getPageNum();  // 요청에서 페이지 번호 가져오기

		int fromIndex = (pageNum - 1) * step;
		int toIndex = Math.min(fromIndex + pageSize, combinedLoanRepaymentRecords.size());

		if (fromIndex >= combinedLoanRepaymentRecords.size()) {
			throw new RuntimeException("페이지 번호가 범위를 벗어났습니다.");
		}

		// 필요에 따라 GetLoanMapResponse를 생성하고 반환
		return combinedLoanRepaymentRecords.subList(fromIndex, toIndex);
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

	public List<LoanRepaymentRecord> getBuddyLoanMap(Member member, GetBuddyLoanMapRequest getBuddyLoanMapRequest) {
		int pageNum = getBuddyLoanMapRequest.getPageNum();

		// pageNum에 따른 month 범위 설정
		int startMonth = (pageNum - 1) * 3 + 1;
		int endMonth = startMonth + 3;

		// age와 loanName, month 범위에 맞는 AverageLoanRepaymentRecord 리스트 가져오기
		List<AverageLoanRepaymentRecord> averageLoanRepaymentRecordList =
			averageLoanRepaymentRecordRepository.findByAgeAndLoanNameAndMonthRange(
				CURRENT_YEAR - Integer.parseInt(member.getBirthday().substring(0,2)),
				getBuddyLoanMapRequest.getLoanName(),
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
}
