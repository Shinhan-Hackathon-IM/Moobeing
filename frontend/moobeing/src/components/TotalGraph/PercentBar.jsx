import React, { useState, useEffect } from "react";
import styled from "styled-components";
import radishImage from "../../assets/radishes/basicRad.svg"; // Radish 이미지 경로를 맞춰주세요

const BarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #e8f5e9; */
  margin-bottom: 0px;
  padding: 10%;
`;

const GraphContainer = styled.div`
  width: 100%;
  background-color: #c0dda6; /* 고정된 배경색 */
  height: 30px;
  border-radius: 20px;
  overflow: visible;
  position: relative;
`;

const GraphFill = styled.div`
  background-color: #658b65; /* 배경색보다 더 진한 색 */
  height: 100%;
  border-radius: 20px;
  width: ${({ fillPercent }) => fillPercent}%;
  transition: width 2s ease; /* 부드러운 채우기 애니메이션 */
  position: relative;
  display: flex;
  justify-content: flex-end; /* Radish가 항상 오른쪽 끝에 위치 */
  align-items: center; /* Radish를 세로로 중앙 정렬 */
`;

const Radish = styled.img`
  height: 60px; /* 그래프 밖으로 삐져나오도록 크기 설정 */
  position: absolute;
  top: -20px; /* 그래프 위쪽으로 조금 삐져나오도록 조정 */
  transform: translateX(20px); /* 오른쪽으로 약간 이동 */
  transition: left 2s ease;
`;

const Text = styled.div`
  margin-top: 5%;
`;

function PercentBar() {
  const [fillPercent, setFillPercent] = useState(0);

  // 예시: 데이터를 받아와서 fillPercent 설정
  useEffect(() => {
    // 백엔드나 API로부터 값을 가져와서 설정할 수 있음
    const fetchedPercent = 20; // 이 값을 나중에 백엔드에서 받아오는 값으로 변경
    setFillPercent(fetchedPercent);
  }, []); // 처음 렌더링 시 실행

  return (
    <BarContainer>
      <GraphContainer>
        <GraphFill fillPercent={fillPercent}>
          <Radish src={radishImage} alt="Radish" />
        </GraphFill>
      </GraphContainer>
      <Text>{fillPercent}% 상환했습니다!</Text>
    </BarContainer>
  );
}

export default PercentBar;
