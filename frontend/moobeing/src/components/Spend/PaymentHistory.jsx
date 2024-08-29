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
  padding: 10% 7% 3% 7%;
`;

const TitleContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SelectDate = styled.div`
  font-weight: 700;
  margin-left: 8px;
  font-size: 18px;
`;

const LoanSort = styled.button`
  font-size: 10px;
  background-color: #e0eed2;
  border: none;
  border-radius: 10px;
  padding: 5px 7px;
  cursor: pointer;
`;

const PaymentHistory = ({ date, history }) => {
  const [filteredHistory, setFilteredHistory] = useState(history);
  const [showLoansOnly, setShowLoansOnly] = useState(false);

  const handleFilterClick = () => {
    setShowLoansOnly((prev) => !prev);
    if (!showLoansOnly) {
      setFilteredHistory(
        history.filter((item) => item.categoryName === "대출")
      );
    } else {
      setFilteredHistory(history);
    }
  };

  return (
    <Container>
      <TitleContent>
        <SelectDate>선택 날짜: {date}</SelectDate>
        <LoanSort onClick={handleFilterClick}>
          {showLoansOnly ? "전체 보기" : "대출만 보기"}
        </LoanSort>
      </TitleContent>
      <PaymentList payments={filteredHistory} />
    </Container>
  );
};

PaymentHistory.propTypes = {
  date: PropTypes.string.isRequired,
  history: PropTypes.array.isRequired,
};

export default PaymentHistory;
