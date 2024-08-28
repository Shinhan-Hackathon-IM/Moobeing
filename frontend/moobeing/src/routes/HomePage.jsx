import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import LoanHistory from "../components/Home/LoanHistory";
import LoanPayment from "../components/Home/LoanPayment";
import QuizPopup from "../components/Home/QuizPopup";
import CreditScore from "../components/Home/CreditScore";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const slideUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-20px);
    opacity: 0;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`;

const QuizWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  animation: ${({ $isclosing }) => ($isclosing ? slideUp : slideDown)} 0.5s
    ease-out;
  transition: opacity 0.5s ease-out;
  opacity: ${({ $isclosing }) => ($isclosing ? 0 : 1)};
`;

const Home = () => {
  const [isQuizPopupVisible, setQuizPopupVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAlarmVisible, setAlarmVisible] = useState(true);

  const handleCloseQuizPopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setQuizPopupVisible(false);
      setAlarmVisible(false);
    }, 500);
  };

  const handleAlarmClick = () => {
    setQuizPopupVisible(true);
  };

  return (
    <Screen>
      <Container>
        <Header
          onAlarmClick={handleAlarmClick}
          isAlarmVisible={isAlarmVisible}
        />
        {isQuizPopupVisible && (
          <QuizWrapper $isclosing={isClosing}>
            <QuizPopup onClose={handleCloseQuizPopup} />
          </QuizWrapper>
        )}
        <LoanHistory />
        <LoanPayment />
        <CreditScore />
      </Container>
      <Footer />
    </Screen>
  );
};

export default Home;
