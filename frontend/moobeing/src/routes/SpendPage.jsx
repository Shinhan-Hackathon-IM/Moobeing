import { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import SubHeader from '../components/Spend/SubHeader';
import PaymentHistory from '../components/Spend/PaymentHistory';
import Calendar from '../components/Spend/Calendar';
import PieGraph from '../components/Spend/PieGraph';
import PaymentCategory from '../components/Spend/PaymentCategory';
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
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

const Spend = () => { 

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleAnalyzeClick = () => {
    setShowAnalysis((prevShowAnalysis) => !prevShowAnalysis);
  };

// 파이 데이터를 여기에 받아와서 두 컴포넌트에 다 적용하도록
  const pieData = [
    {
      "id": "식비",
      "label": "식비",
      "value": 213,
      "color": "hsl(190, 70%, 50%)"
    },
    {
      "id": "대출",
      "label": "대출",
      "value": 533,
      "color": "hsl(250, 70%, 50%)"
    },
    {
      "id": "문화",
      "label": "문화",
      "value": 100,
      "color": "hsl(234, 70%, 50%)"
    },
    {
      "id": "유흥",
      "label": "유흥",
      "value": 282,
      "color": "hsl(198, 70%, 50%)"
    },
    {
      "id": "교통",
      "label": "교통",
      "value": 39,
      "color": "hsl(117, 70%, 50%)"
    },
    {
      "id": "건강",
      "label": "건강",
      "value": 34,
      "color": "hsl(61, 96%, 81%)"
    }
  ];

  return (
    <Container>
      <Header/>
        <SubHeader 
          month={selectedDate.format('MM월')}
          onAnalyzeClick={handleAnalyzeClick}
        />
        {!showAnalysis ? (
          <>
            <CalendarWrapper>
              <Calendar selectedDate={selectedDate} onDateChange={handleDateChange}/>
            </CalendarWrapper>
            <PaymentHistory date={selectedDate.format('MM월 DD일')} />
          </>
        ) : (
          <>
            <PieWrapper>
              <PieGraph data={pieData} width="100%" height={300} />
            </PieWrapper>
            <PaymentCategory data={pieData} />
          </>
        )}
      <Footer/>
    </Container>
  );
};

export default Spend;