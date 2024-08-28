import { useState } from "react";
import styled from "styled-components";
import babyRad from "../../assets/radishes/babyRad.svg";

const Container = styled.div`
  background-color: #f5fded;
  height: 500px;
  width: 90%;
  margin-bottom: 5%;
  margin-top: 5%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
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

const SubTitle = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: left;
`;

const Radish = styled.img`
  height: 150px; /* 적절한 크기로 설정 */
  margin-bottom: 20px;
`;

const QuizButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
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
      <SubTitle>
        {김싸피}님, "내 소비내역 맞추기"
        <br />
        퀴즈가 도착했어요
      </SubTitle>
      <Radish src={babyRad} alt="Radish" />
      <QuizButton>퀴즈 풀고 무 뽑으러 가기</QuizButton>
    </Container>
  );
}

export default QuizPopup;
