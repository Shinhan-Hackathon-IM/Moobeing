import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import leftButton from "../../assets/button/leftButton.svg";
import rightButton from "../../assets/button/rightButton.svg";
import leftButtonBlack from "../../assets/button/leftButtonBlack.svg";
import rightButtonBlack from "../../assets/button/rightButtonBlack.svg";

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

const PaymentName = styled.div`
  display: flex;
  flex-direction: row;
`;

const PaymentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

const InterestRate = styled.div`
  margin-left: auto;
  font-size: 10px;
  font-weight: bold;
  background-color: #e0eed2;
  padding: 5px 8px;
  border-radius: 10px;
  color: white;
`;

const PaymentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 97%;
  height: 260px;
  overflow: hidden;
  margin: 20px 0;
  padding-left: 10px;
`;

const PaymentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  width: 100%;
`;

const ScrollButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavigationImage = styled.img`
  width: 20px;
  height: 20px;
`;

const PageInfo = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 0 10px;
`;

function PaymentList({ payments }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const loansPerPage = 3;
  const totalPages = Math.ceil(payments.length / loansPerPage);

  const handleScrollNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + loansPerPage;
      return nextIndex >= payments.length ? 0 : nextIndex; // Loop back to the first page
    });
  };

  const handleScrollPrev = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexNew = prevIndex - loansPerPage;
      return prevIndexNew < 0 ? payments.length - loansPerPage : prevIndexNew; // Loop back to the last page
    });
  };

  const visiblePayments = payments.slice(
    currentIndex,
    currentIndex + loansPerPage
  );
  const currentPage = Math.floor(currentIndex / loansPerPage) + 1;

  return (
    <>
      <PaymentListContainer>
        <PaymentListWrapper>
          {visiblePayments.map((payment, index) => (
            <PaymentItem key={index}>
              <BankLogo
                src={`/images/${payment.bank_name}_logo.png`}
                alt={payment.bank_name}
              />
              <PaymentInfo>
                <PaymentName>
                  <div>{payment.loanTypeName}</div>
                </PaymentName>
                <div>{payment.loanBalance}</div>
              </PaymentInfo>
              <InterestRate>{payment.interestRate}</InterestRate>
            </PaymentItem>
          ))}
        </PaymentListWrapper>
      </PaymentListContainer>
      <ScrollButton>
        <NavigationImage
          src={currentPage > 1 ? leftButtonBlack : leftButton}
          alt="이전"
          onClick={handleScrollPrev}
        />
        <PageInfo>
          {currentPage}/{totalPages}
        </PageInfo>
        <NavigationImage
          src={currentPage < totalPages ? rightButtonBlack : rightButton}
          alt="다음"
          onClick={handleScrollNext}
        />
      </ScrollButton>
    </>
  );
}

PaymentList.propTypes = {
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      bank_name: PropTypes.string.isRequired,
      loanBalance: PropTypes.string.isRequired,
      loanTypeName: PropTypes.string.isRequired,
      interestRate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PaymentList;
