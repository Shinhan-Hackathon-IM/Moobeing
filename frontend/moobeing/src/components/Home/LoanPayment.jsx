import styled from "styled-components";

const Container = styled.div`
  background-color: #f5fded;
  height: 500px; /* 높이를 크게 설정 */
  width: 100%;
  margin-bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function LoanPayment() {
  return <Container>대출 상환입니다</Container>;
}

export default LoanPayment;
