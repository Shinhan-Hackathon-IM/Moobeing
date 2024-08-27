package com.im.moobeing.domain.account.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.im.moobeing.domain.account.dto.GetAccountDto;
import com.im.moobeing.domain.account.dto.response.GetAccountResponse;
import com.im.moobeing.domain.account.entity.Account;
import com.im.moobeing.domain.account.repository.AccountRepository;
import com.im.moobeing.domain.member.entity.Member;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountService {
	private final AccountRepository accountRepository;

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
}
