import { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SubHeader from "../components/Spend/SubHeader";
import PaymentHistory from "../components/Spend/PaymentHistory";
import Calendar from "../components/Spend/Calendar";
import PieGraph from "../components/Spend/PieGraph";
import PaymentCategory from "../components/Spend/PaymentCategory";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";
import { getPieChart, getSpendDataByDay } from "../apis/SpendApi"; // API 함수 가져오기

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const ScrollableContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 70px;
`;

const CalendarWrapper = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const PieWrapper = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const transitionStyles = `
  .fade-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  .fade-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 500ms, transform 500ms;
  }
  .fade-exit {
    opacity: 1;
    transform: translateY(0);
  }
  .fade-exit-active {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 500ms, transform 500ms;
  }
`;

const Spend = () => {
  const [pieData, setPieData] = useState([]); // 파이 차트 데이터를 저장할 상태
  const [categoryData, setCategoryData] = useState([]); // 카테고리 데이터를 저장할 상태
  const [selectedDate, setSelectedDate] = useState(dayjs()); // 현재 선택된 날짜를 저장할 상태
  const [showAnalysis, setShowAnalysis] = useState(false); // 분석 화면을 보여줄지 여부를 결정하는 상태
  const [totalExpense, setTotalExpense] = useState(0); // 총 지출을 저장할 상태
  const [monthlySpendData, setMonthlySpendData] = useState([]); // 한 달 지출 데이터를 저장할 상태
  const [dailyHistory, setDailyHistory] = useState([]); // 선택된 날짜의 지출 내역을 저장할 상태

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate); // 날짜가 변경될 때 상태 업데이트
  };

  const handleAnalyzeClick = () => {
    setShowAnalysis((prevShowAnalysis) => !prevShowAnalysis); // 분석 화면 토글
  };

  // 이건 카테고리 파이차트 내용 가져와서 분석할 때 보내는 용
  useEffect(() => {
    const fetchPieData = async () => {
      const year = selectedDate.year(); // 선택된 날짜에서 연도 추출
      const month = selectedDate.month() + 1; // 선택된 날짜에서 월 추출 (0부터 시작하므로 +1)

      try {
        const data = await getPieChart(year, month); // 선택된 연도와 월로 API 호출하여 데이터 가져오기
        setPieData(data.getPieChartList); // 가져온 데이터를 pieData 상태에 설정
        setTotalExpense(data.totalExpense);
        setCategoryData(data.getCategoryList);
      } catch (error) {
        console.error("카테고리 파이차트 가져오기 실패:", error); // 데이터 가져오기 실패 시 콘솔에 에러 출력
      }
    };

    fetchPieData(); // 컴포넌트 마운트 시 또는 selectedDate가 변경될 때 데이터 가져오기
  }, [selectedDate]); // 의존성 배열에 selectedDate 추가하여 날짜 변경 시마다 useEffect 실행

  // 이건 캘린더랑 대출 상환 내역 띄우는 용도로 필요한 내용
  useEffect(() => {
    const fetchSpendDataByDay = async () => {
      const year = selectedDate.year(); // 선택된 날짜에서 연도 추출
      const month = selectedDate.month() + 1; // 선택된 날짜에서 월 추출 (0부터 시작하므로 +1)

      try {
        const spendData = await getSpendDataByDay(year, month); // 선택된 연도와 월로 API 호출하여 특정 날짜의 지출 데이터 가져오기
        setMonthlySpendData(spendData); // 한 달 지출 데이터를 상태로 저장

        const dayData = spendData.find(
          (data) => data.date === selectedDate.format("YYYY-MM-DD")
        ); // 선택된 날짜에 해당하는 데이터 찾기

        setDailyHistory(dayData ? dayData.history : []); // 데이터가 있는 경우 설정, 없는 경우 빈 배열
      } catch (error) {
        console.error("특정 날짜의 지출 데이터 가져오기 실패:", error); // 데이터 가져오기 실패 시 콘솔에 에러 출력
        setDailyHistory([]); // 오류 발생 시 빈 배열로 초기화
      }
    };

    fetchSpendDataByDay(); // 컴포넌트 마운트 시 또는 selectedDate가 변경될 때 데이터 가져오기
  }, [selectedDate]); // 의존성 배열에 selectedDate 추가하여 날짜 변경 시마다 useEffect 실행

  return (
    <PageWrapper>
      <Header />
      <ScrollableContent>
        <SubHeader
          month={selectedDate.format("M월")} // 선택된 날짜의 월을 "MM월" 형식으로 전달
          onAnalyzeClick={handleAnalyzeClick} // 분석 버튼 클릭 핸들러 전달
          totalExpense={totalExpense} // 총 지출 전달
        />
        <style>{transitionStyles}</style>
        <TransitionGroup component={null}>
          {!showAnalysis ? (
            <CSSTransition key="calendar" classNames="fade" timeout={300}>
              <>
                <CalendarWrapper>
                  <Calendar
                    selectedDate={selectedDate} // 선택된 날짜를 Calendar 컴포넌트에 전달
                    onDateChange={handleDateChange} // 날짜 변경 핸들러 전달
                    monthlySpendData={monthlySpendData} // 한 달 지출 데이터를 Calendar 컴포넌트에 전달
                  />
                </CalendarWrapper>
                <PaymentHistory
                  date={selectedDate.format("M월 D일")}
                  history={dailyHistory} // 선택된 날짜의 지출 내역을 PaymentHistory 컴포넌트에 전달
                />
              </>
            </CSSTransition>
          ) : (
            <CSSTransition key="analysis" classNames="fade" timeout={300}>
              <>
                <PieWrapper>
                  <PieGraph data={pieData} width="100%" height={300} />{" "}
                  {/* 파이 차트 데이터를 PieGraph 컴포넌트에 전달 */}
                </PieWrapper>
                <PaymentCategory data={categoryData} />{" "}
                {/* 파이 차트 데이터를 PaymentCategory 컴포넌트에 전달 */}
              </>
            </CSSTransition>
          )}
        </TransitionGroup>
      </ScrollableContent>
      <Footer />
    </PageWrapper>
  );
};

export default Spend;
