import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f5fded;
  height: 500px;
  width: 100%;
  margin-bottom: 5%;
  position: relative; /* 엑스 버튼의 위치를 상대적으로 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: black;
`;

function QuizPopup() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null; // 컴포넌트를 숨기기

  return (
    <Container>
      <CloseButton onClick={handleClose}>×</CloseButton>
      퀴즈 팝업입니다
    </Container>
  );
}

export default QuizPopup;
