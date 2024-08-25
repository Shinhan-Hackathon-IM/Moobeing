import styled from "styled-components";

const RadishContainer = styled.div`
  width: 100%;
  height: 300px; /* 각 컴포넌트의 고정된 높이 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e3f2fd;
  margin-bottom: 20px;
`;

function HiddenRadish() {
  return (
    <RadishContainer>
      <h1>대기중인 무입니다</h1>
    </RadishContainer>
  );
}

export default HiddenRadish;
