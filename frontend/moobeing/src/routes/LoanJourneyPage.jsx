import styled from "styled-components";
import LoanGraph from "../components/LoanGraph/LoanGraph";
import LoanDescription from "../components/LoanGraph/LoanGraph";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";

const LoanJourney = () => {
  const loanData = [
    { month: 1, repayment_amount: 100000 },
    { month: 2, repayment_amount: 98000 },
    { month: 3, repayment_amount: 96000 },
    // ... 추가 월별 데이터
  ];
  return (
    <div>
      <Header />
      <LoanGraph loanData={loanData}></LoanGraph>
      <LoanDescription></LoanDescription>
      <Footer />
    </div>
  );
};

export default LoanJourney;
