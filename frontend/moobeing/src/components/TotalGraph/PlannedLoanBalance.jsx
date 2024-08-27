import styled from "styled-components";

const Container = styled.div`
  background-color: #f5fded;
  height: 150px; /* 높이를 크게 설정 */
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px; /* 내부 여백 추가 */
  box-sizing: border-box;
  border-radius: 5%;
`;

const SubHeader = styled.div`
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

function PlannedLoanBalance() {
  return (
    <Container>
      <SubHeader>
        <SubTitle>이번달 상환 예정 금액</SubTitle>
      </SubHeader>
      <LoanBalanceContainer>
        <LoanBalance>1001101010 원</LoanBalance>
      </LoanBalanceContainer>
    </Container>
  );
}

export default PlannedLoanBalance;
