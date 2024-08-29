import React from "react";
import styled from "styled-components";
import TotalGraph from "../components/TotalGraph/TotalGraph";
import PercentBar from "../components/TotalGraph/PercentBar";
import HiddenRadish from "../components/TotalGraph/HiddenRadish";
import LeftMoney from "../components/TotalGraph/LeftMoney";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  align-items: center;
`;

const ScrollableContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 5% 0 0 0;
  box-sizing: border-box;
`;

const Rectangle = styled.div`
  width: 100%;
  height: 70px;
  background-color: #c0dda5;
  bottom: 65px;
  z-index: 1;
  padding-top: 90px;
`;

const RadishWrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 2;
  margin-bottom: -30px;
`;

const TotalJourney = () => {
  const paidLoanNum = 5;
  const totalLoanNum = 5;
  const data = {
    paging: {
      current_page: 1,
      total_pages: 10,
      per_page: 20,
      total_items: 200,
    },
    items: [
      { id: 1, month: 1, replayment_amount: 4000000 },
      { id: 2, month: 2, replayment_amount: 3800000 },
      { id: 3, month: 3, replayment_amount: 3500000 },
      { id: 4, month: 4, replayment_amount: 3200000 },
      { id: 5, month: 5, replayment_amount: 3000000 },
      { id: 6, month: 6, replayment_amount: 2900000 },
      { id: 7, month: 7, replayment_amount: 2900000 },
      { id: 8, month: 8, replayment_amount: 2800000 },
      { id: 9, month: 9, replayment_amount: 2600000 },
      { id: 10, month: 10, replayment_amount: 2400000 },
      { id: 11, month: 11, replayment_amount: 2200000 },
      { id: 12, month: 12, replayment_amount: 1200000 },
    ],
  };

  const peerData = {
    paging: {
      current_page: 1,
      total_pages: 10,
      per_page: 20,
      total_items: 200,
    },
    items: [
      { id: 1, month: 1, replayment_amount: 3800000 },
      { id: 2, month: 2, replayment_amount: 3600000 },
      { id: 3, month: 3, replayment_amount: 3400000 },
      { id: 4, month: 4, replayment_amount: 3300000 },
      { id: 5, month: 5, replayment_amount: 3100000 },
      { id: 6, month: 6, replayment_amount: 3000000 },
      { id: 7, month: 7, replayment_amount: 2800000 },
      { id: 8, month: 8, replayment_amount: 2700000 },
      { id: 9, month: 9, replayment_amount: 2500000 },
      { id: 10, month: 10, replayment_amount: 2300000 },
      { id: 11, month: 11, replayment_amount: 2100000 },
      { id: 12, month: 12, replayment_amount: 1900000 },
    ],
  };

  return (
    <PageWrapper>
      <ScrollableContent>
        <Header />
        <Container>
          <TotalGraph data={data} peerData={peerData} />
          <PercentBar />
          <LeftMoney />
          <RadishWrapper>
            <HiddenRadish
              PaidLoanNum={paidLoanNum}
              TotalLoanNum={totalLoanNum}
            />
          </RadishWrapper>
        </Container>
        <Rectangle />
      </ScrollableContent>
      <Footer />
    </PageWrapper>
  );
};

export default TotalJourney;
