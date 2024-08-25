import { useState } from "react";
import styled from "styled-components";
import LoanList from "./LoanList";

const Container = styled.div`
  background-color: #f5fded;
  height: 900px;
  width: 90%;
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

const memberLoans = [
  {
    bank_name: "신한은행",
    loanBalance: "12345원",
    loanTypeName: "참대출",
    interestRate: "3.1%",
  },
  {
    bank_name: "신한은행",
    loanBalance: "123453원",
    loanTypeName: "참대출",
    interestRate: "2.1%",
  },
  {
    bank_name: "신한은행",
    loanBalance: "123451234원",
    loanTypeName: "참대출",
    interestRate: "1.1%",
  },
  {
    bank_name: "신한은행",
    loanBalance: "22345원",
    loanTypeName: "참대출",
    interestRate: "6.1%",
  },
];

function LoanHistory() {
  const [loans, setLoans] = useState(memberLoans);

  const sortByInterestRate = () => {
    const sortedLoans = [...loans].sort(
      (a, b) => parseFloat(b.interestRate) - parseFloat(a.interestRate)
    );
    setLoans(sortedLoans);
  };

  const sortByLoanMoney = () => {
    const sortedLoans = [...loans].sort(
      (a, b) =>
        parseInt(b.loanBalance.replace(/[^\d]/g, "")) -
        parseInt(a.loanBalance.replace(/[^\d]/g, ""))
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
