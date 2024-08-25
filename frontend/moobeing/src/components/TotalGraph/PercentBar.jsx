import styled from "styled-components";

const BarContainer = styled.div`
  width: 100%;
  height: 300px; /* 각 컴포넌트의 고정된 높이 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e8f5e9;
  margin-bottom: 20px;
`;

function PercentBar() {
  return (
    <BarContainer>
      <h1>상환 금액 퍼센트 입니다</h1>
    </BarContainer>
  );
}

export default PercentBar;
