import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import babyRad from "../../assets/radishes/babyRad.svg";

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  height: 300px;
  width: 90%;
  margin-bottom: 5%;
  margin-top: 10%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  color: #24272d;
  box-shadow: 3px 3px 3px #d9d9d9;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
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
  border-radius: 10px;
`;

function QuizPopup() {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const quizId = null; // 실제로는 API 호출 또는 다른 방법으로 설정될 것

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleQuiz = () => {
    navigate(`/quiz/result/${quizId}`);
  };

  if (!isVisible) return null; // 컴포넌트를 숨기기

  return (
    <Container>
      <CloseButton onClick={handleClose}>×</CloseButton>
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
