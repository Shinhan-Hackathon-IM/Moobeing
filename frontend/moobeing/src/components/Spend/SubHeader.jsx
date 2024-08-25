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
  padding: 20px; /* 내부 여백 추가 */
  box-sizing: border-box;
`;

const SubHeader = ({ month, onAnalyzeClick }) => {
  return (
    <>
      <Title>
        <h1>제갈싸피님의 <br/> 
        {month} 지출내역</h1>
      </Title>
      <LoanSum>
        <span>총지출: 811,000</span>
        <button onClick={onAnalyzeClick}>분석하기</button>
      </LoanSum>
    </>
  );
};

SubHeader.propTypes = {
  month: PropTypes.string.isRequired,
  onAnalyzeClick: PropTypes.func.isRequired,
};

export default SubHeader;