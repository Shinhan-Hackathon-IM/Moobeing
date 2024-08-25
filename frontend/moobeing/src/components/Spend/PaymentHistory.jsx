import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import PaymentList from "./PaymentList";

const Container = styled.div`
  background-color: #f5fded;
  width: 90%;
  margin-bottom: 5%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 20px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
`;

const DateTitle = styled.div`
  margin: 0;
`;
const SubTitle = styled.div`
  margin: 0;
`;

const TotalLoan = styled.div`
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

const PaymentHistory = ({ date }) => {
  const [payments, setPayments] = useState(memberLoans);

  return (
    <Container>
      <Header>
        <DateTitle>{date}</DateTitle>
        <SubTitle>대출 상환 내역</SubTitle>
      </Header>
      <TotalLoan>총 상환액: 124,556,663 원</TotalLoan>
      <PaymentList payments={payments} />
    </Container>
  );
};

PaymentHistory.propTypes = {
  date: PropTypes.string.isRequired,
};

export default PaymentHistory;