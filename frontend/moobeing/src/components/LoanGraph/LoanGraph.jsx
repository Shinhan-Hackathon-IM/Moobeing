import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import leftButton from "../../assets/button/leftButtonWhite.svg";
import rightButton from "../../assets/button/rightButtonWhite.svg";
import DropDownArrow from "../../assets/dropdown/DropdownArrow.png";

const GraphContainer = styled.div`
  background-color: #f5fded;
  height: 565px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 10px 10px 10px;
  box-sizing: border-box;
  border-radius: 5%;
  position: relative;
`;

const ChartContainer = styled.div`
  width: 87%;
  height: 390px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TitleOfChart = styled.h4`
  margin-top: 5vh;
  margin-bottom: 1vh;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 5px;
  right: 0;
  transform: translateY(-50%);
  width: 97%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
`;

const Button = styled.button`
  padding: 5px;
  cursor: pointer;
  background-color: #e0eed2;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  transition: background-color 0.3s;

  &:hover {
    background-color: #348833;
  }

  img {
    width: 18px;
    height: 18px;
  }
`;

const ToggleWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
`;

const ToggleButton = styled.div`
  position: relative;
  width: 60px;
  height: 35px;
  background-color: ${(props) => (props.active ? "#c1e1c1" : "#E0EED2")};
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleCircle = styled.div`
  position: absolute;
  top: 3px;
  left: ${(props) => (props.active ? "calc(100% - 33px)" : "3px")};
  width: 30px;
  height: 30px;
  background-color: #348833;
  border-radius: 50%;
  transition: left 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 9px;
  font-weight: 700;
`;

const DataCollectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const DataCollectButton = styled.button`
  background-color: #e0eed2;
  border: none;
  border-radius: 10px;
  padding: 8px 0px;
  font-weight: 300;
  width: 50px;
  font-size: 15px;
`;

const CustomDropdownContainer = styled.div`
  position: relative;
  width: 100px;
  max-width: 300px;
  display: inline-block;
  margin: 10px 0;
`;

const CustomDropdownHeader = styled.div`
  padding: 6px 12px;
  font-size: 15px;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url(${DropDownArrow});
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background-color: #e0eed2;
  border-radius: 10px;

  &:focus {
    border-bottom: 2px solid #4caf50;
  }
`;

const CustomDropdownList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 150px;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const CustomDropdownItem = styled.li`
  padding: 8px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #c5e1ab;
  }

  ${(props) =>
    props.selected &&
    `
    background-color: #C5E1AB;
  `}
`;

const CustomDropdown = ({ options, selectedOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <CustomDropdownContainer>
      <CustomDropdownHeader onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? `${selectedOption}년` : "연도를 선택하세요"}
      </CustomDropdownHeader>
      {isOpen && (
        <CustomDropdownList>
          {options.map((option) => (
            <CustomDropdownItem
              key={option}
              onClick={() => handleOptionClick(option)}
              selected={option === selectedOption}
            >
              {option}년
            </CustomDropdownItem>
          ))}
        </CustomDropdownList>
      )}
    </CustomDropdownContainer>
  );
};

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
          padding: "3px 10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <p>{`${label}월`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${formatToKoreanWon(entry.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function LoanGraph({ data = [], peerData = [] }) {
  const { loanName } = useParams();
  const [visibleRange, setVisibleRange] = useState([0, 4]);
  const [yAxisDomain, setYAxisDomain] = useState([0, 0]);
  const [showPeerData, setShowPeerData] = useState(false);
  const [currentYear, setCurrentYear] = useState(null);
  const [isYearly, setIsYearly] = useState(true); // 초기 상태는 '연도별'

  // 사용 가능한 모든 연도를 추출
  const availableYears = [...new Set(data.map((item) => item.year))];

  // 버튼 클릭 시 호출될 함수
  const handleButtonClick = () => {
    setIsYearly(!isYearly); // 상태를 토글하여 '연도별'과 '월별'을 전환
  };

  useEffect(() => {
    if (data.length > 0) {
      setVisibleRange([0, 4]);
      setCurrentYear(data[0].year); // 초기 연도를 첫 데이터의 연도로 설정
    }
  }, [data]);

  useEffect(() => {
    updateYAxisDomain();
  }, [data, peerData, visibleRange, showPeerData]);

  const updateYAxisDomain = () => {
    const visibleData = getVisibleData(data, visibleRange);
    let maxAmount = Math.max(...visibleData.map((item) => item.loanBalance));
    let minAmount = Math.min(...visibleData.map((item) => item.loanBalance));

    if (showPeerData && peerData.length > 0) {
      const visiblePeerData = getVisibleData(peerData, visibleRange);
      maxAmount = Math.max(
        maxAmount,
        ...visiblePeerData.map((item) => item.loanBalance)
      );
      minAmount = Math.min(
        minAmount,
        ...visiblePeerData.map((item) => item.loanBalance)
      );
    }

    const difference = maxAmount - minAmount;
    const paddedMin = Math.max(0, minAmount - difference * 0.1);
    const paddedMax = maxAmount + difference * 0.1;

    // Only set state if it is different from the current state
    if (paddedMin !== yAxisDomain[0] || paddedMax !== yAxisDomain[1]) {
      setYAxisDomain([paddedMin, paddedMax]);
    }
  };

  // 스크롤 버튼 클릭 시 보이는 데이터 범위를 조정하는 함수
  const handleScroll = (direction) => {
    setVisibleRange((prevRange) => {
      const newStart = Math.max(0, prevRange[0] + direction * 3);
      const newEnd = Math.min(data.length, newStart + 4); // 마지막 범위를 넘어가지 않도록 조정
      return [newStart, newEnd];
    });
  };

  const handleYearChange = (event) => {
    const selectedYear = parseInt(event.target.value);
    setCurrentYear(selectedYear);
    // 선택된 연도의 1월 데이터로 이동
    const newIndex = data.findIndex(
      (item) => item.year === selectedYear && item.month === 1
    );
    setVisibleRange([newIndex, newIndex + 4]); // 선택된 연도의 1월로 이동하여 4개월 보여줌
  };

  // getVisibleData 함수 수정
  const getVisibleData = (sourceData) => {
    return sourceData.slice(visibleRange[0], visibleRange[1]).map((item) => ({
      ...item,
      loanBalance: item.loanBalance || null, // null 값 처리
    }));
  };
  const visibleData = getVisibleData(data, visibleRange);
  const visiblePeerData = getVisibleData(peerData, visibleRange);

  // 값을 한국 원화 형식으로 변환하는 함수
  const formatToKoreanWon = (value) => {
    if (value >= 100000000) {
      return `${Math.floor(value / 100000000)}억`;
    } else if (value >= 10000) {
      return `${Math.floor(value / 10000)}만`;
    } else {
      return `${value}`;
    }
  };

  // 데이터가 없는 경우 표시할 메시지
  if (!data || data.length === 0) {
    return (
      <GraphContainer>
        <h1>데이터가 없습니다.</h1>
      </GraphContainer>
    );
  }

  return (
    <GraphContainer>
      <ToggleWrapper onClick={() => setShowPeerData(!showPeerData)}>
        <ToggleButton active={showPeerData}>
          <ToggleCircle active={showPeerData}>
            {showPeerData ? "끄기" : "또래"}
          </ToggleCircle>
        </ToggleButton>
      </ToggleWrapper>
      <TitleOfChart>{loanName} 여정</TitleOfChart>
      <DataCollectContainer>
        <CustomDropdown
          options={availableYears}
          selectedOption={currentYear}
          onChange={handleYearChange}
        />
        <DataCollectButton onClick={handleButtonClick}>
          {isYearly ? "연별" : "월별"}
        </DataCollectButton>
      </DataCollectContainer>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={visibleData}
            margin={{ top: 5, right: 12, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => `${value}월`}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={yAxisDomain}
              tickFormatter={formatToKoreanWon}
              width={60}
              tick={{ fontSize: 10 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 20, paddingLeft: 50 }}
            />
            <Line
              type="monotone"
              dataKey="loanBalance"
              name="내 상환액"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={500}
              animationEasing="ease-in-out"
              connectNulls={false}
            />
            {showPeerData && (
              <Line
                type="monotone"
                data={visiblePeerData}
                dataKey="loanBalance"
                name="또래 평균 상환액"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
                isAnimationActive={true}
                animationBegin={0}
                animationDuration={500}
                animationEasing="ease-in-out"
                connectNulls={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
      <ButtonContainer>
        <Button
          onClick={() => handleScroll(-1)}
          disabled={visibleRange[0] === 0}
        >
          <img src={leftButton} alt="이전" />
        </Button>
        <Button
          onClick={() => handleScroll(1)}
          disabled={visibleRange[1] >= data.length}
        >
          <img src={rightButton} alt="다음" />
        </Button>
      </ButtonContainer>
    </GraphContainer>
  );
}

export default LoanGraph;
