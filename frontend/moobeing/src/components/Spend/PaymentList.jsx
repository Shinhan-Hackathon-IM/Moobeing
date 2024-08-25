import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const BankLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PaymentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
`;

const InterestRate = styled.div`
  margin-left: auto;
  font-size: 1.2em;
  font-weight: bold;
`;

const PaymentListContainer = styled.div`
  height: 300px;
  overflow: hidden;
`;

const PaymentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

const DownButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
`;

function PaymentList({ payments }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const loansPerPage = 3;

  const handleScrollDown = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + loansPerPage;
      return nextIndex >= payments.length ? 0 : nextIndex; // Infinite loop
    });
  };

  const visibleLoans = payments.slice(currentIndex, currentIndex + loansPerPage);

  return (
    <>
      <PaymentListContainer>
        <PaymentListWrapper>
          {visibleLoans.map((loan, index) => (
            <PaymentItem key={index}>
              <BankLogo
                src={`/images/${loan.bank_name}_logo.png`}
                alt={loan.bank_name}
              />
              <PaymentInfo>
                <div>{loan.loanTypeName}</div>
                <div>{loan.loanBalance}</div>
              </PaymentInfo>
              <InterestRate>{loan.interestRate}</InterestRate>
            </PaymentItem>
          ))}
        </PaymentListWrapper>
      </PaymentListContainer>
      <DownButton onClick={handleScrollDown}>아래로</DownButton>
    </>
  );
}

PaymentList.propTypes = {
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      bank_name: PropTypes.string.isRequired,
      loanBalance: PropTypes.string.isRequired, 
      loanTypeName: PropTypes.string.isRequired,
      interestRate: PropTypes.string.isRequired
    })
  ).isRequired
};

export default PaymentList;
