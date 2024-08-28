import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getNotStartedQuiz, submitAnswer } from "../apis/QuizApi";
import upArrow from "../assets/quiz/upArrow.svg";
import downArrow from "../assets/quiz/downArrow.svg";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  background-color: #e0eed2;
  /* min-height: 100vh; */
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuizContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuizText = styled.div`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
`;

const ArrowButton = styled.button`
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UpButton = styled(ArrowButton)`
  background-color: #59a458;
`;

const DownButton = styled(ArrowButton)`
  background-color: #ffc045;
`;

const ArrowIcon = styled.img`
  width: 40px;
  height: 40px;
`;

function Quiz() {
  const [quizData, setQuizData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const data = await getNotStartedQuiz();
        if (data) {
          setQuizData(data);
        } else {
          console.log("시작되지 않은 퀴즈가 없습니다.");
          // 퀴즈가 없을 때의 처리를 여기에 추가할 수 있습니다.
        }
      } catch (error) {
        console.error("퀴즈 불러오기 실패:", error);
      }
    }
    fetchQuiz();
  }, []);

  const handleAnswer = async (answer) => {
    if (!quizData) return;
    try {
      await submitAnswer(quizData.quiz_id, answer);
      navigate(`/quiz/result`);
    } catch (error) {
      console.error("답변 제출 실패:", error);
    }
  };

  if (!quizData) return <div>잠시만용!!</div>;

  return (
    <PageContainer>
      <QuizContainer>
        <QuizText>
          username님의
          <br />
          지난 주 지출액은
          <br />
          {quizData.example}원
        </QuizText>
        <ButtonContainer>
          <UpButton onClick={() => handleAnswer("up")}>
            <ArrowIcon src={upArrow} alt="Up" />
          </UpButton>
          <DownButton onClick={() => handleAnswer("down")}>
            <ArrowIcon src={downArrow} alt="Down" />
          </DownButton>
        </ButtonContainer>
      </QuizContainer>
    </PageContainer>
  );
}

export default Quiz;
