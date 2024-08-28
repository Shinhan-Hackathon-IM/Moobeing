import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoanHistory from "../components/Home/LoanHistory";
import LoanPayment from "../components/Home/LoanPayment";
import QuizPopup from "../components/Home/QuizPopup";
import CreditScore from "../components/Home/CreditScore";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";

import { getNotStartedQuiz } from "../apis/QuizApi";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 250vh;
  width: 100%;
  box-sizing: border-box;
`;

const Home = () => {
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await getNotStartedQuiz();
        setQuizData(data);
      } catch (error) {
        console.error("퀴즈 데이터 가져오기 실패:", error);
      }
    };

    fetchQuizData();
  }, []);

  return (
    <Container>
      <Header />
      {quizData && <QuizPopup />}
      <LoanHistory />
      <LoanPayment />
      <CreditScore />
      <Footer />
    </Container>
  );
};

export default Home;
