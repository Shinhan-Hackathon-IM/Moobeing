import { useState } from "react";
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

const LoanName = styled.div`
  display: flex;
  flex-direction: row;
`;

const LoanItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

const NavigateButton = styled.button`
  margin-left: 5px;
  margin-top: -2px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-weight: 800;
  font-family: Nanum Gothic;
  font-size: 10px;
`;

const InterestRate = styled.div`
  margin-left: auto;
  font-size: 12px;
  font-weight: bold;
  background-color: #e0eed2;
  padding: 5px 8px;
  border-radius: 5px;
  color: white;
`;

const LoanListContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬을 위해 추가 */
  justify-content: flex-start; /* 컨텐츠를 위쪽에 붙이기 위해 수정 */
  align-items: center;
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin-top: 20px;
`;

const LoanListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  width: 100%;
`;

const DownButton = styled.button`
  background-color: #c0dda6;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 15px;
  cursor: pointer;
  border-radius: 10px;
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
                <LoanName>
                  <div>{loan.loan_type}</div>
                  <NavigateButton>&gt;</NavigateButton>
                </LoanName>
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
