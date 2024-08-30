import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TotalGraph from "../components/TotalGraph/TotalGraph";
import PercentBar from "../components/TotalGraph/PercentBar";
import HiddenRadish from "../components/TotalGraph/HiddenRadish";
import LeftMoney from "../components/TotalGraph/LeftMoney";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";
import { getAllLoanMapByMonth, getAllLoanBuddy } from "../apis/LoanApi";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  align-items: center;
  padding-bottom: 70px;
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
  const [journeyData, setJourneyData] = useState([]);
  const [peerData, setPeerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [paidLoanNum, setPaidLoanNum] = useState(5);
  const [totalLoanNum, setTotalLoanNum] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [loanResponse, buddyResponse] = await Promise.all([
          getAllLoanMapByMonth(),
          getAllLoanBuddy(),
        ]);

        const { getAllJourneyList: journeyListData } = loanResponse;
        const { getAllJourneyList: peerListData } = buddyResponse;

        setJourneyData(journeyListData);
        setPeerData(peerListData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <PageWrapper>
      <ScrollableContent>
        <Header />
        <Container>
          {journeyData.length > 0 ? (
            <TotalGraph data={journeyData} peerData={peerData} />
          ) : (
            <div>데이터가 없습니다.</div>
          )}
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
