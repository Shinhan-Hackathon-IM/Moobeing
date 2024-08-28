package com.im.moobeing.domain.account.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.im.moobeing.domain.account.dto.GetAccountDto;
import com.im.moobeing.domain.account.dto.request.SendAccountRequest;
import com.im.moobeing.domain.account.dto.response.GetAccountResponse;
import com.im.moobeing.domain.account.dto.response.SendAccountResponse;
import com.im.moobeing.domain.account.entity.Account;
import com.im.moobeing.domain.account.repository.AccountRepository;
import com.im.moobeing.domain.loan.entity.LoanRepaymentRecord;
import com.im.moobeing.domain.loan.entity.MemberLoan;
import com.im.moobeing.domain.loan.repository.LoanRepaymentRecordRepository;
import com.im.moobeing.domain.loan.repository.MemberLoanRepository;
import com.im.moobeing.domain.member.entity.Member;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountService {
	private final AccountRepository accountRepository;
	private final MemberLoanRepository memberLoanRepository;
	private final LoanRepaymentRecordRepository loanRepaymentRecordRepository;

	public GetAccountResponse getAccount(Member member) {
		List<Account> accountList =  accountRepository.findByMemberId(member.getId());

		List<GetAccountDto> getAccountDtoList = new ArrayList<>();

		for (Account account : accountList) {
			getAccountDtoList.add(
				GetAccountDto.of(account.getAccountNum())
			);
		}

		return GetAccountResponse.of(getAccountDtoList);
	}

	@Transactional
	public SendAccountResponse sendAccount(Member member, SendAccountRequest sendAccountRequest) {
		// 여기서 계좌 번호를 찾아서 balance를 빼고
		Account account = accountRepository.findByMemberIdAndAccountNum(member.getId(), sendAccountRequest.getAccountNum())
			.orElseThrow(() -> new RuntimeException("todo 계좌 번호 없음"));

		Long oldAccountBalance = account.getAccountBalance() - sendAccountRequest.getMoney();

		if(oldAccountBalance < 0) {
			throw new RuntimeException("todo 돈 없음");
		}

		account.setAccountBalance(oldAccountBalance);

		// 여기서 대출 번호를 찾아서 remain_balance를 빼면된다. (member와 대출 상품이름으로 찾는다)
		MemberLoan memberLoan = memberLoanRepository.findByMemberIdAndLoanProductName(member.getId(), sendAccountRequest.getLoanName())
			.orElseThrow(() -> new RuntimeException("todo 대출 없음"));

		Long oldLoanBalance = memberLoan.getRemainingBalance() - sendAccountRequest.getMoney();

		if(oldLoanBalance < 0) {
			throw new RuntimeException("todo 대출 초과 상환임");
		}

		// 현재 시간 가져오기
		LocalDateTime now = LocalDateTime.now();

		// 대출 상환 기록 추가
		LoanRepaymentRecord loanRepaymentRecord = LoanRepaymentRecord.builder()
			.memberLoanId(memberLoan.getId())
			.repaymentBalance(sendAccountRequest.getMoney())
			.repaymentDate(Timestamp.valueOf(now)) // 현재 시간 설정
			.year(now.getYear()) // 현재 년도 설정
			.month(now.getMonthValue()) // 현재 월 설정
			.day(now.getDayOfMonth()) // 현재 일 설정
			.build();

		// 대출 상환 기록 저장
		loanRepaymentRecordRepository.save(loanRepaymentRecord);

		return SendAccountResponse.of(oldAccountBalance);
	}
}
