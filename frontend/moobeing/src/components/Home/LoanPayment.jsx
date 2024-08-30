import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getLoanSum } from "../../apis/LoanApi";
import goToJourney from "../../assets/button/goToJourney.svg";

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  height: 500px; /* 높이를 크게 설정 */
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 8%; /* 내부 여백 추가 */
  box-sizing: border-box;
  color: #24272d;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  margin: 0;
`;

const LoanBalanceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
`;

const LoanBalance = styled.div`
  font-size: 20px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  margin: 0 2px 10px;
  flex-shrink: 1;
  min-width: 0;
  flex-grow: 1;
`;

const PayButton = styled.button`
  padding: 10px 15px;
  background-color: #c0dda6;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  flex-shrink: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  transition: all 0.2s ease-in-out; /* 버튼 클릭 시 애니메이션 추가 */

  &:hover {
    background-color: #b5c99a; /* 호버 시 약간 더 어두운 색상 */
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 깊이 변경 */
    transform: translateY(-2px); /* 호버 시 약간 떠오르는 효과 */
  }

  &:active {
    background-color: #a9b98e; /* 클릭 시 더 어두운 색상 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 클릭 시 그림자 효과 줄임 */
    transform: translateY(0); /* 클릭 시 원래 위치로 돌아옴 */
  }
`;

const NavigateButton = styled.button`
  margin-left: 5px;
  margin-top: 4px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-weight: 800;
  font-family: Nanum Gothic;
`;

const NavigateImage = styled.img`
  width: 20px;
  height: 20px;
`;

function LoanPayment() {
  const [loanSum, setLoanSum] = useState({ sumLoanValue: 0 }); // 기본값을 0으로 설정
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const fetchLoanSum = async () => {
      try {
        const data = await getLoanSum(); // API 호출
        setLoanSum(data);
      } catch (error) {
        setError(
          "대출 정보를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요."
        ); // 사용자에게 보여줄 에러 메시지 설정
        setLoanSum({ sumLoanValue: 0 }); // 에러 발생 시 기본값 0으로 설정
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
        {loanSum.sumLoanValue.toLocaleString()} 원
        <NavigateButton onClick={handleSpendPage}>
          <NavigateImage src={goToJourney} alt="여정지도" />
        </NavigateButton>
      </LoanBalance>
    </Container>
  );
}

export default LoanPayment;
