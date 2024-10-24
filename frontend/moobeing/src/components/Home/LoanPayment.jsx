import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getLoanMonthly } from "../../apis/LoanApi";
import goToJourney from "../../assets/button/goToJourney.svg";

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  height: 500px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 8%; /* 내부 여백 추가 */
  box-sizing: border-box;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.div`
  margin: 0;
  font-size: 22px;
  font-weight: 700;

  @media (min-width: 600px) {
    font-size: 27px;
  }
`;

const LoanBalance = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 5px;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  margin: 0 2px 10px;
  flex-shrink: 1;
  min-width: 0;
  flex-grow: 1;

  @media (min-width: 600px) {
    font-size: 25px;
  }
`;

const NavigateButton = styled.button`
  margin-left: 5px;
  margin-top: 4px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-weight: 700;
`;

const NavigateImage = styled.img`
  width: 20px;
  height: 20px;
`;

function LoanPayment() {
  const [loanSum, setLoanSum] = useState({ monthlyLoanAmount: 0 }); // 기본값을 0으로 설정
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const fetchLoanSum = async () => {
      try {
        const data = await getLoanMonthly(); // API 호출
        setLoanSum(data);
      } catch (error) {
        setError(
          "대출 정보를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요."
        ); // 사용자에게 보여줄 에러 메시지 설정
        setLoanSum({ monthlyLoanAmount: 0 }); // 에러 발생 시 기본값 0으로 설정
      }
    };

    fetchLoanSum();
  }, []);

  const navigate = useNavigate();

  const handleSpendPage = () => {
    navigate("/spend");
  };

  return (
    <Container>
      <SubHeader>
        <SubTitle>이번 달 상환 예정 금액</SubTitle>
      </SubHeader>
      <LoanBalance>
        {loanSum.monthlyLoanAmount.toLocaleString()} 원
        <NavigateButton onClick={handleSpendPage}>
          <NavigateImage src={goToJourney} alt="여정지도" />
        </NavigateButton>
      </LoanBalance>
    </Container>
  );
}

export default LoanPayment;
