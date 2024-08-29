import styled from "styled-components";
import LoanGraph from "../components/LoanGraph/LoanGraph";
import LoanDescription from "../components/LoanGraph/LoanGraph";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";
import { getLoanMapByProductName } from "../apis/LoanApi";
import { useState, useEffect } from "react";

const LoanJourney = () => {
  const [loanData, setLoanData] = useState([]);

  useEffect(() => {
    setLoanData(getLoanMapByProductName);
  });

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
