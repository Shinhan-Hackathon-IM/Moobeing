import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BankLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

const LoanInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoanItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

const InterestRate = styled.div`
  margin-left: auto;
  font-size: 1.2em;
  font-weight: bold;
`;

const LoanListContainer = styled.div`
  height: 300px;
  overflow: hidden;
`;

const LoanListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

const DownButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
`;

function LoanList({ loans }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const loansPerPage = 3;
  const navigate = useNavigate();

  const handleScrollDown = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + loansPerPage;
      return nextIndex >= loans.length ? 0 : nextIndex; // 무한 순환
    });
  };

  const handleLoanItemClick = (loanId) => {
    navigate(`/loan-journey/${loanId}`);
  };

  const visibleLoans = loans.slice(currentIndex, currentIndex + loansPerPage);

  return (
    <>
      <LoanListContainer>
        <LoanListWrapper>
          {visibleLoans.map((loan, index) => (
            <LoanItem
              key={index}
              onClick={() => handleLoanItemClick(loan.user_deposit_id)}
            >
              <BankLogo src={loan.bank_logo_url} alt={loan.bank_name} />
              <LoanInfo>
                <div>{loan.loan_type}</div>
                <div>{loan.loan_amount.toLocaleString()} 원</div>
              </LoanInfo>
              <InterestRate>{loan.interest_rate.toFixed(2)}%</InterestRate>
            </LoanItem>
          ))}
        </LoanListWrapper>
      </LoanListContainer>
      <DownButton onClick={handleScrollDown}>아래로</DownButton>
    </>
  );
}

export default LoanList;
