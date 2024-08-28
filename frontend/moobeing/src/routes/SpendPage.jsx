import { useState } from "react";
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
`;

const CalendarWrapper = styled.div`
  width: 100%;
  padding: 20px;
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
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleAnalyzeClick = () => {
    setShowAnalysis((prevShowAnalysis) => !prevShowAnalysis);
  };

  const pieData = [
    { id: "식비", label: "식비", value: 213, color: "hsl(190, 70%, 50%)" },
    { id: "대출", label: "대출", value: 533, color: "hsl(250, 70%, 50%)" },
    { id: "문화", label: "문화", value: 100, color: "hsl(234, 70%, 50%)" },
    { id: "유흥", label: "유흥", value: 282, color: "hsl(198, 70%, 50%)" },
    { id: "교통", label: "교통", value: 39, color: "hsl(117, 70%, 50%)" },
    { id: "건강", label: "건강", value: 34, color: "hsl(61, 96%, 81%)" },
  ];

  return (
    <PageWrapper>
      <Header />
      <ScrollableContent>
        <SubHeader
          month={selectedDate.format("MM월")}
          onAnalyzeClick={handleAnalyzeClick}
        />
        <style>{transitionStyles}</style>
        <TransitionGroup component={null}>
          {!showAnalysis ? (
            <CSSTransition key="calendar" classNames="fade" timeout={300}>
              <>
                <CalendarWrapper>
                  <Calendar
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                  />
                </CalendarWrapper>
                <PaymentHistory date={selectedDate.format("MM월 DD일")} />
              </>
            </CSSTransition>
          ) : (
            <CSSTransition key="analysis" classNames="fade" timeout={300}>
              <>
                <PieWrapper>
                  <PieGraph data={pieData} width="100%" height={300} />
                </PieWrapper>
                <PaymentCategory data={pieData} />
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
