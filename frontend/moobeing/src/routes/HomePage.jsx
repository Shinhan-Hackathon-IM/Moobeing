import styled from "styled-components";
import LoanHistory from "../components/Home/LoanHistory";
import LoanPayment from "../components/Home/LoanPayment";
import QuizPopup from "../components/Home/QuizPopup";
import CreditScore from "../components/Home/CreditScore";
import Footer from "../components/Fixed/Footer";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 200vh; /* 고정된 페이지 크기 설정 */
  width: 100%;
  box-sizing: border-box;
`;

const Home = () => {
  return (
    <Container>
      <QuizPopup />
      <LoanHistory />
      <LoanPayment />
      <CreditScore />
      <Footer/>
    </Container>
  );
};

export default Home;
