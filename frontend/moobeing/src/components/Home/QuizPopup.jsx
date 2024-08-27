import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import babyRad from "../../assets/radishes/babyRad.svg";
import closeButton from "../../assets/button/closeButton.svg";

// Keyframe for fade-out animation
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  height: 300px;
  width: 90%;
  margin-bottom: 5%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  color: #24272d;
  box-shadow: 3px 3px 3px #d9d9d9;
  animation: ${({ isClosing }) =>
    isClosing
      ? css`
          ${fadeOut} 0.5s ease-out forwards
        `
      : "none"};
  transition: opacity 0.5s ease-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 8px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const CloseImg = styled.img`
  width: 15px;
`;

const SubTitle = styled.div`
  position: absolute;
  top: 35px;
  left: 40px;
  font-size: 1.1rem;
  font-weight: 800;
  text-align: left;
`;

const Radish = styled.img`
  height: 150px; /* 적절한 크기로 설정 */
  margin-top: 35px;
`;

const QuizButton = styled.button`
  background-color: #c0dda6;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 15px;
  cursor: pointer;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  transition: all 0.2s ease-in-out; /* 버튼 클릭 시 애니메이션 추가 */

  &:hover {
    background-color: #b5c99a; /* 호버 시 약간 더 어두운 색상 */
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 깊이 변경 */
    transform: translateY(-2px); /* 호버 시 약간 떠오르는 효과 */
  }

  &:active {
    background-color: #a9b98e; /* 클릭 시 더 어두운 색상 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 클릭 시 그림자 효과 줄임 */
    transform: translateY(0); /* 클릭 시 원래 위치로 돌아옴 */
  }
`;

function QuizPopup() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false); // State to handle the closing animation
  const navigate = useNavigate(); // useNavigate 훅 사용

  const quizId = null; // 실제로는 API 호출 또는 다른 방법으로 설정될 것

  const handleClose = () => {
    setIsClosing(true); // Start the fade-out animation
    setTimeout(() => {
      setIsVisible(false); // Hide the component after animation
    }, 500); // Match the timeout with the animation duration
  };

  const handleQuiz = () => {
    navigate(`/quiz/result/${quizId}`);
  };

  if (!isVisible) return null; // 컴포넌트를 숨기기

  return (
    <Container isClosing={isClosing}>
      <CloseButton onClick={handleClose}>
        <CloseImg src={closeButton} alt="닫기" />
      </CloseButton>
      <SubTitle>
        김싸피님, "내 소비내역 맞추기"
        <br />
        퀴즈가 도착했어요!
      </SubTitle>
      <Radish src={babyRad} alt="Radish" />
      <QuizButton onClick={handleQuiz}>퀴즈 풀고 무 뽑으러 가기</QuizButton>
    </Container>
  );
}

export default QuizPopup;
