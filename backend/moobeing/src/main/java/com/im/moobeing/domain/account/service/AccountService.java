package com.im.moobeing.domain.account.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.im.moobeing.domain.account.dto.GetAccountDto;
import com.im.moobeing.domain.account.dto.request.CreateAccountProductRequest;
import com.im.moobeing.domain.account.dto.request.DepositRequest;
import com.im.moobeing.domain.account.dto.request.GetCreateDemandDepositAccountRequest;
import com.im.moobeing.domain.account.dto.request.SendAccountRequest;
import com.im.moobeing.domain.account.dto.request.TransferRequest;
import com.im.moobeing.domain.account.dto.response.AccountProductResponse;
import com.im.moobeing.domain.account.dto.response.GetAccountResponse;
import com.im.moobeing.domain.account.dto.response.SendAccountResponse;
import com.im.moobeing.domain.account.entity.Account;
import com.im.moobeing.domain.account.entity.AccountProduct;
import com.im.moobeing.domain.account.repository.AccountProductRepository;
import com.im.moobeing.domain.account.repository.AccountRepository;
import com.im.moobeing.domain.loan.entity.LoanRepaymentRecord;
import com.im.moobeing.domain.loan.entity.MemberLoan;
import com.im.moobeing.domain.loan.repository.LoanRepaymentRecordRepository;
import com.im.moobeing.domain.loan.repository.MemberLoanRepository;
import com.im.moobeing.domain.member.entity.Member;
import com.im.moobeing.global.client.ShinhanClient;
import com.im.moobeing.global.client.dto.request.GetInquireDemandDepositAccountListRequest;
import com.im.moobeing.global.client.dto.request.GetUpdateDemandDepositAccountDepositRequest;
import com.im.moobeing.global.client.dto.request.GetUpdateDemandDepositAccountTransferRequest;
import com.im.moobeing.global.config.ApiKeyConfig;
import com.im.moobeing.global.error.ErrorCode;
import com.im.moobeing.global.error.exception.BadRequestException;
import com.im.moobeing.global.util.BankCodeUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountService {

    private final AccountProductRepository accountProductRepository;
	private final AccountRepository accountRepository;
	private final MemberLoanRepository memberLoanRepository;
	private final LoanRepaymentRecordRepository loanRepaymentRecordRepository;
    private final ShinhanClient shinhanClient;
    private final ApiKeyConfig apiKeyConfig;
    private final BankCodeUtil bankCodeUtil;

    @Transactional(readOnly = false)
    public void createAccountProduct(CreateAccountProductRequest request) {
        if (!bankCodeUtil.existsBankCode(request.getBankCode())) {
            throw new BadRequestException(ErrorCode.AC_INVALID_BANK_CODE);
        }

        if (accountProductRepository.existsByBankCodeAndAccountName(request.getBankCode(), request.getAccountName())) {
            throw new BadRequestException(ErrorCode.AC_ALREADY_EXISTS_PRODUCT);
        }

        AccountProduct accountProduct = AccountProduct.builder()
                .bankCode(request.getBankCode())
                .accountName(request.getAccountName())
                .accountDescription(request.getAccountDescription())
                .build();

        accountProductRepository.save(accountProduct);
    }

    public List<AccountProductResponse> getAllAccountProducts() {
        return accountProductRepository.findAll()
                .stream()
                .filter(ap -> bankCodeUtil.getBankName(ap.getBankCode()).isPresent())
                .map(ap -> AccountProductResponse.of(ap, bankCodeUtil.getBankName(ap.getBankCode()).get()))
                .toList();
    }

	public GetAccountResponse getAccount(Member member) {
		List<Account> accountList = accountRepository.findByMemberId(member.getId());

		List<GetAccountDto> getAccountDtoList = new ArrayList<>();

		for (Account account : accountList) {
			getAccountDtoList.add(
				GetAccountDto.of(account.getAccountNum())
			);
		}

		return GetAccountResponse.of(getAccountDtoList);
	}

    @Transactional(readOnly = false)
    public Account makeAccount(Member member, Long productId) {
        AccountProduct accountProduct = accountProductRepository.findById(productId)
                .orElseThrow(() -> new BadRequestException(ErrorCode.AC_INVALID_PRODUCT_CODE));
        // 가입한 계좌 확인
        var accountListRequest = new GetInquireDemandDepositAccountListRequest(apiKeyConfig, member.getUserKey());
        boolean isDuplicated = shinhanClient.getInquireDemandDepositAccountList(accountListRequest)
                .getRec()
                .stream()
                .anyMatch(rec -> Objects.equals(rec.getBankCode(), accountProduct.getBankCode()) && Objects.equals(rec.getAccountName(), accountProduct.getAccountName()));

        if (isDuplicated) throw new BadRequestException(ErrorCode.AC_ALREADY_EXISTS_PRODUCT);

        // 계좌 가입
        var request = new GetCreateDemandDepositAccountRequest(apiKeyConfig, member.getUserKey(), accountProduct.getAccountTypeUniqueNo());
        var rec = shinhanClient.getCreateDemandDepositAccount(request).getRec();

        Account account = Account.builder()
                .accountNum(rec.getAccountNo())
                .memberId(member.getId())
                .accountBalance(0L)
                .build();
        Account ret = accountRepository.save(account);
        return ret;
    }

    @Transactional(readOnly = false)
    public void transferFunds(Member member, TransferRequest transferRequest) {
        Account account = accountRepository.findByMemberIdAndAccountNum(member.getId(), transferRequest.getFromAccount())
                .orElseThrow(() -> new BadRequestException(ErrorCode.AC_INVALID_ACCOUNT_NUM));

        if (account.getAccountBalance() < transferRequest.getBalance()) {
            throw new BadRequestException(ErrorCode.AC_INSUFFICIENT_BALANCE);
        }

        Account toAccount = accountRepository.findByAccountNum(transferRequest.getToAccount())
                .orElseThrow(() -> new BadRequestException(ErrorCode.AC_INVALID_TO_ACCOUNT_NUM));

        var request = new GetUpdateDemandDepositAccountTransferRequest(
                apiKeyConfig,
                member.getUserKey(),
                transferRequest.getToAccount(),
                transferRequest.getBalance(),
                transferRequest.getFromAccount(),
                transferRequest.getDepositTransactionSummary(),
                transferRequest.getDepositTransactionSummary()
        );

        var header = shinhanClient.getUpdateDemandDepositAccountTransfer(request).getHeader();
        if (!header.getResponseCode().equals("H0000")) {
            throw new BadRequestException(ErrorCode.AC_INSUFFICIENT_BALANCE);
        }

        account.updateBalance(-transferRequest.getBalance());
        accountRepository.save(account);
        toAccount.updateBalance(transferRequest.getBalance());
        accountRepository.save(toAccount);
    }

    @Transactional(readOnly = false)
    public void depositFunds(Member member, DepositRequest depositRequest) {
        Account account = accountRepository.findByMemberIdAndAccountNum(member.getId(), depositRequest.getAccountNo())
                .orElseThrow(() -> new BadRequestException(ErrorCode.AC_INVALID_ACCOUNT_NUM));

        var request = new GetUpdateDemandDepositAccountDepositRequest(
                apiKeyConfig,
                member.getUserKey(),
                depositRequest.getAccountNo(),
                depositRequest.getTransactionBalance(),
                depositRequest.getTransactionSummary()
        );
        var header = shinhanClient.getUpdateDemandDepositAccountDeposit(request).getHeader();

        if (!header.getResponseCode().equals("H0000")) {
            throw new BadRequestException(ErrorCode.AC_INSUFFICIENT_BALANCE);
        }

        account.updateBalance(depositRequest.getTransactionBalance());
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
