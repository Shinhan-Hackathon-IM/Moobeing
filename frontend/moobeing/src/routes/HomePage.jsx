import { useState } from "react";
import styled from "styled-components";
import LoanHistory from "../components/Home/LoanHistory";
import LoanPayment from "../components/Home/LoanPayment";
import QuizPopup from "../components/Home/QuizPopup";
import CreditScore from "../components/Home/CreditScore";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";

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
`;

const Home = () => {
  const [isQuizPopupVisible, setQuizPopupVisible] = useState(true);

  const handleCloseQuizPopup = () => {
    setQuizPopupVisible(false);
  };

  return (
    <Container>
      <Header />
      <QuizWrapper>
        {" "}
        {isQuizPopupVisible && <QuizPopup onClose={handleCloseQuizPopup} />}
      </QuizWrapper>
      <LoanHistory />
      <LoanPayment />
      <CreditScore />
      <Footer />
    </Container>
  );
};

export default Home;
