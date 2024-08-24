import React, { useState } from "react";
import styled from "styled-components";
import LoanList from "./LoanList";

const Container = styled.div`
  background-color: #f5fded;
  height: 900px;
  width: 100%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10%;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5%;
`;

const SubTitle = styled.h2`
  margin: 0;
`;

const SortButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SortButton = styled.p`
  margin: 0;
  cursor: pointer;
`;

const TotalLoan = styled.h1`
  margin-top: 0;
`;

const list = [
  {
    bank_name: "신한은행",
    loan_money: "12345원",
    loan_name: "참대출",
    interest_rate: "3.1%",
  },
  {
    bank_name: "신한은행",
    loan_money: "123453원",
    loan_name: "참대출",
    interest_rate: "2.1%",
  },
  {
    bank_name: "신한은행",
    loan_money: "123451234원",
    loan_name: "참대출",
    interest_rate: "1.1%",
  },
  {
    bank_name: "신한은행",
    loan_money: "22345원",
    loan_name: "참대출",
    interest_rate: "6.1%",
  },
];

function LoanHistory() {
  const [loans, setLoans] = useState(list);

  const sortByInterestRate = () => {
    const sortedLoans = [...loans].sort(
      (a, b) => parseFloat(b.interest_rate) - parseFloat(a.interest_rate)
    );
    setLoans(sortedLoans);
  };

  const sortByLoanMoney = () => {
    const sortedLoans = [...loans].sort(
      (a, b) =>
        parseInt(b.loan_money.replace(/[^\d]/g, "")) -
        parseInt(a.loan_money.replace(/[^\d]/g, ""))
    );
    setLoans(sortedLoans);
  };

  return (
    <Container>
      <Header>
        <SubTitle>나의 대출현황</SubTitle>
        <SortButtonContainer>
          <SortButton onClick={sortByInterestRate}>금리순</SortButton>
          <SortButton onClick={sortByLoanMoney}>금액순</SortButton>
        </SortButtonContainer>
      </Header>
      <TotalLoan> 124,556,663 원</TotalLoan>
      <LoanList loans={loans} />
    </Container>
  );
}

export default LoanHistory;
