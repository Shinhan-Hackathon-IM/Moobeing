import { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import SubHeader from '../components/Spend/SubHeader';
import PaymentHistory from '../components/Spend/PaymentHistory';
import Calendar from '../components/Spend/Calendar';
import PieGraph from '../components/Spend/PieGraph';
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
    {
      "id": "javascript",
      "label": "javascript",
      "value": 213,
      "color": "hsl(190, 70%, 50%)"
    },
    {
      "id": "rust",
      "label": "rust",
      "value": 533,
      "color": "hsl(250, 70%, 50%)"
    },
    {
      "id": "stylus",
      "label": "stylus",
      "value": 134,
      "color": "hsl(234, 70%, 50%)"
    },
    {
      "id": "sass",
      "label": "sass",
      "value": 282,
      "color": "hsl(198, 70%, 50%)"
    },
    {
      "id": "ruby",
      "label": "ruby",
      "value": 39,
      "color": "hsl(117, 70%, 50%)"
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
          <PieGraph data={pieData} />
        )}
      <Footer/>
    </Container>
  );
};

export default Spend;