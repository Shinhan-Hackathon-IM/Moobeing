package com.im.moobeing.domain.credit.repository;

import com.im.moobeing.domain.credit.entity.Credit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditRepository extends JpaRepository<Credit, Long> {
}
