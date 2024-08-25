import styled from "styled-components";

const Container = styled.div`
  background-color: #f5fded;
  height: 500px; /* 높이를 크게 설정 */
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px; /* 내부 여백 추가 */
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const LoanBalanceContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LoanBalance = styled.div`
  font-size: 1.2rem;
`;

const PayButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

function LoanPayment() {
  return (
    <Container>
      <Header>
        <SubTitle>이번달 상환 예정 금액</SubTitle>
      </Header>
      <LoanBalanceContainer>
        <LoanBalance>1001101010 원</LoanBalance>
        <PayButton>결제하기</PayButton>
      </LoanBalanceContainer>
    </Container>
  );
}

export default LoanPayment;
