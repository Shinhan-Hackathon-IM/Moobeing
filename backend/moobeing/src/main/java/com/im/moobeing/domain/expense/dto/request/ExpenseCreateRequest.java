package com.im.moobeing.domain.expense.dto.request;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseCreateRequest {
    @NonNull
    String title;
    int price;
    @NonNull
    String category;
    @NonNull
    LocalDate localDate;
}


