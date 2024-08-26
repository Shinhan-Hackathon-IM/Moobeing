import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getQuizzes, submitAnswer } from "../apis/QuizApi";
import upArrow from "../assets/quiz/upArrow.svg";
import downArrow from "../assets/quiz/downArrow.svg";

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
  const [quizData, setQuizData] = useState("dj");

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const data = await getQuizzes();
        setQuizData(data[0]); // 첫 번째 퀴즈를 사용
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
      // 여기에 답변 제출 후 처리 로직을 추가할 수 있습니다.
    } catch (error) {
      console.error("답변 제출 실패:", error);
    }
  };

  if (!quizData) return <div>Loading...</div>;

  return (
    <PageContainer>
      <QuizContainer>
        <QuizText>
          제갈싸피님의
          <br />
          지난 주 지출액은
          <br />
          20만원
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
