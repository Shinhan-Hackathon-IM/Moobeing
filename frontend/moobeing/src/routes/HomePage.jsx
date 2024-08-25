import styled from "styled-components";
import LoanHistory from "../components/Home/LoanHistory";
import LoanPayment from "../components/Home/LoanPayment";
import QuizPopup from "../components/Home/QuizPopup";
import CreditScore from "../components/Home/CreditScore";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 200vh;
  width: 100%;
  box-sizing: border-box;
`;

const Home = () => {
  return (
    <Container>
      <Header />
      <QuizPopup />
      <LoanHistory />
      <LoanPayment />
      <CreditScore />
      <Footer />
    </Container>
  );
};

export default Home;
