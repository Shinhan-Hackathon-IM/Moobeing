import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Title = styled.div`
  background-color: #f5fded;
  height: 20vh; /* 높이를 크게 설정 */
  width: 90%;
  margin-top: 3vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px; /* 내부 여백 추가 */
  box-sizing: border-box;
`;

const LoanSum = styled.div`
  background-color: #f5fded;
  height: 8vh;
  width: 90%;
  margin-bottom: 5%;
  margin-top: 3vh;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const SpendSum = styled.span`
  font-weight: 700;
  margin-left: 5px;
`;

const AnalyzeButton = styled.button`
  background-color: #e0eed2;
  border: none;
  padding: 5px 8px;
  border-radius: 10px;
  font-weight: 700;
`;

const SubHeader = ({ month, onAnalyzeClick }) => {
  const [buttonText, setButtonText] = useState("분석하기");

  const handleButtonClick = () => {
    setButtonText((prevText) =>
      prevText === "분석하기" ? "캘린더 보기" : "분석하기"
    );
    onAnalyzeClick();
  };

  return (
    <>
      <Title>
        <h1>
          제갈싸피님의 <br />
          {month} 지출내역
        </h1>
      </Title>
      <LoanSum>
        <SpendSum>총지출: 811,000</SpendSum>
        <AnalyzeButton onClick={handleButtonClick}>{buttonText}</AnalyzeButton>
      </LoanSum>
    </>
  );
};

SubHeader.propTypes = {
  month: PropTypes.string.isRequired,
  onAnalyzeClick: PropTypes.func.isRequired,
};

export default SubHeader;
