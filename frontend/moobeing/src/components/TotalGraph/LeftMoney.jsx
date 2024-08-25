import styled from "styled-components";

const MoneyContainer = styled.div`
  width: 100%;
  height: 300px; /* 각 컴포넌트의 고정된 높이 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffebee;
  margin-bottom: 20px;
`;

function LeftMoney() {
  return (
    <MoneyContainer>
      <h1>남은 상환금액입니다</h1>
    </MoneyContainer>
  );
}

export default LeftMoney;
