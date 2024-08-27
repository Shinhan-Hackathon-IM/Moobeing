import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  padding: 10%; /* 내부 여백 추가 */
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
  justify-content: space-between;
  align-items: center;
`;

const LoanBalance = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-shrink: 1;
  min-width: 0;
  flex-grow: 1;
`;

const PayButton = styled.button`
  padding: 10px 10px;
  background-color: #c0dda6;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  flex-shrink: 0;
`;

function LoanPayment() {
  const navigate = useNavigate();

  const handleRepayment = () => {
    navigate("/repayment/1");
  };

  return (
    <Container>
      <SubHeader>
        <SubTitle>이번달 상환 예정 금액</SubTitle>
      </SubHeader>
      <LoanBalanceContainer>
        <LoanBalance>235,568,683,229 원</LoanBalance>
        <PayButton onClick={handleRepayment}>상환하기</PayButton>
      </LoanBalanceContainer>
    </Container>
  );
}

export default LoanPayment;
