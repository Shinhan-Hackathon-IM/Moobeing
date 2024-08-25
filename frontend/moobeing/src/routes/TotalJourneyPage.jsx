import React from "react";
import styled from "styled-components";
import TotalGraph from "../components/TotalGraph/TotalGraph";
import PercentBar from "../components/TotalGraph/PercentBar";
import PlannedLoanBalance from "../components/TotalGraph/PlannedLoanBalance";
import HiddenRadish from "../components/TotalGraph/HiddenRadish";
import LeftMoney from "../components/TotalGraph/LeftMoney";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 200vh;
  width: 100%;
  padding: 8%;
  overflow-y: auto;
  box-sizing: border-box;
`;

const TotalJourney = () => {
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
    <Container>
      <TotalGraph data={data} peerData={peerData} />
      <PercentBar />
      <PlannedLoanBalance />
      <LeftMoney />
      <HiddenRadish />
    </Container>
  );
};

export default TotalJourney;
