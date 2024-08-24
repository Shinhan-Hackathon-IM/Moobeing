import styled from "styled-components";

const Container = styled.div`
  background-color: #f5fded;
  height: 600px; /* 높이를 크게 설정 */
  width: 100%;
  margin-bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function CreditScore() {
  return <Container>신용등급 입니다.</Container>;
}

export default CreditScore;
