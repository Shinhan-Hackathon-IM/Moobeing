import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const GraphContainer = styled.div`
  background-color: #f5fded;
  height: 550px;
  width: 100%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5%;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  cursor: pointer;
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const formatToKoreanWon = (value) => {
      if (value >= 100000000) {
        return `${Math.floor(value / 100000000)}억`;
      } else if (value >= 10000) {
        return `${Math.floor(value / 10000)}만`;
      } else {
        return `${value}`;
      }
    };

    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        <p>{`${label}월`}</p>
        <p style={{ color: payload[0].color }}>
          {`상환액: ${formatToKoreanWon(payload[0].value)}`}
        </p>
      </div>
    );
  }
  return null;
};

function LoanGraph({ loanData }) {
  const [visibleRange, setVisibleRange] = useState([0, 4]);
  const [yAxisDomain, setYAxisDomain] = useState([0, 0]);

  useEffect(() => {
    updateYAxisDomain();
  }, [loanData, visibleRange]);

  const updateYAxisDomain = () => {
    if (loanData && loanData.length > visibleRange[0]) {
      const visibleData = loanData.slice(visibleRange[0], visibleRange[1]);
      let maxAmount = Math.max(
        ...visibleData.map((item) => item.repayment_amount)
      );
      let minAmount = Math.min(
        ...visibleData.map((item) => item.repayment_amount)
      );

      const difference = maxAmount - minAmount;
      const paddedMin = Math.max(0, minAmount - difference * 0.1);
      const paddedMax = maxAmount + difference * 0.1;

      setYAxisDomain([paddedMin, paddedMax]);
    }
  };

  const handleScroll = (direction) => {
    setVisibleRange((prevRange) => {
      const newStart = Math.max(0, prevRange[0] + direction * 3);
      const newEnd = Math.min(loanData.length, newStart + 4);
      return [newStart, newEnd];
    });
  };

  const formatToKoreanWon = (value) => {
    if (value >= 100000000) {
      return `${Math.floor(value / 100000000)}억`;
    } else if (value >= 10000) {
      return `${Math.floor(value / 10000)}만`;
    } else {
      return `${value}`;
    }
  };

  if (!loanData || loanData.length === 0) {
    return (
      <GraphContainer>
        <h1>데이터가 없습니다.</h1>
      </GraphContainer>
    );
  }

  const visibleData = loanData.slice(visibleRange[0], visibleRange[1]);

  return (
    <GraphContainer>
      <h1>대출 상환 그래프</h1>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={visibleData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              type="number"
              domain={["dataMin", "dataMax"]}
              ticks={visibleData.map((d) => d.month)}
            />
            <YAxis
              domain={yAxisDomain}
              tickFormatter={formatToKoreanWon}
              width={60}
              tick={{ fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="repayment_amount"
              name="상환액"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={500}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
      <ButtonContainer>
        <Button
          onClick={() => handleScroll(-1)}
          disabled={visibleRange[0] === 0}
        >
          &lt; 이전
        </Button>
        <Button
          onClick={() => handleScroll(1)}
          disabled={visibleRange[1] >= loanData.length}
        >
          다음 &gt;
        </Button>
      </ButtonContainer>
    </GraphContainer>
  );
}

export default LoanGraph;
