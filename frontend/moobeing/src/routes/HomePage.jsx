import { useState } from "react";
import styled, { keyframes } from "styled-components";
import LoanHistory from "../components/Home/LoanHistory";
import LoanPayment from "../components/Home/LoanPayment";
import QuizPopup from "../components/Home/QuizPopup";
import CreditScore from "../components/Home/CreditScore";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
`;

const QuizWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  animation: ${({ isClosing }) => (isClosing ? slideUp : slideDown)} 0.5s
    ease-out;
  transition: opacity 0.5s ease-out;
  opacity: ${({ isClosing }) => (isClosing ? 0 : 1)};
`;

const Home = () => {
  const [isQuizPopupVisible, setQuizPopupVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseQuizPopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setQuizPopupVisible(false);
    }, 500);
  };

  return (
    <Container>
      <Header />
      <LoanHistory />
      {isQuizPopupVisible && (
        <QuizWrapper isClosing={isClosing}>
          <QuizPopup onClose={handleCloseQuizPopup} />
        </QuizWrapper>
      )}
      <LoanPayment />
      <CreditScore />
      <Footer />
    </Container>
  );
};

export default Home;
