import styled from "styled-components";
import LoanGraph from "../components/LoanGraph/LoanGraph";
import LoanDescription from "../components/LoanGraph/LoanDescription";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";
import { getLoanMapByProductName, getProductLoanBuddy } from "../apis/LoanApi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

const LoanJourney = () => {
  const { loanName } = useParams(); // useParams를 사용하여 URL 매개변수 가져오기
  const [loanData, setLoanData] = useState([]);
  const [loanPeerData, setLoanPeerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 상태 시작
        const data = await getLoanMapByProductName(loanName); // 비동기 함수 호출 및 데이터 가져오기
        setLoading(false); // 로딩 상태 종료

        const { getAllJourneyList } = data;
        setLoanData(getAllJourneyList); // 데이터 상태 업데이트
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
        setError(error); // 에러 상태 업데이트
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchData(); // 데이터 가져오기 함수 호출
  }, [loanName]); // loanName이 변경될 때마다 useEffect 실행

  if (loading) return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>; // 에러 발생 시 표시할 내용

  return (
    <PageWrapper>
      <ScrollableContent>
        <Header />
        <Container>
          {loanData.length > 0 ? (
            <LoanGraph data={loanData} peerData={loanPeerData} />
          ) : (
            <div>데이터가 없습니다.</div>
          )}
          <LoanDescription />
        </Container>
      </ScrollableContent>
      <Footer />
    </PageWrapper>
  );
};

export default LoanJourney;
