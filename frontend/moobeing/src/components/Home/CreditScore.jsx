import { useEffect, useState } from "react";
import styled from "styled-components";
import { darken } from "polished"; // polished에서 darken 가져오기
import radish from "../../assets/radishes/basicRad.svg";
import { getCreditRate } from "../../apis/UserApi";

// 신용등급별 색상
const GraphColors = {
  A: "#85BD85",
  B: "#C0DDA6",
  C: "#DDD1A6",
  D: "#DDBDA6",
  E: "#DDA6A6",
};

// 신용등급별 다음 등급 맵핑
const NextGrade = {
  A: null, // 다음 등급 없음
  B: "A",
  C: "B",
  D: "C",
  E: "D",
};

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  height: 600px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 모든 요소를 수직 중앙 정렬 */
  align-items: center; /* 모든 요소를 수평 중앙 정렬 */
  padding: 8%;
  box-sizing: border-box;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  margin: 0;
`;

const CreditLevel = styled.div`
  background-color: ${({ grade }) =>
    GraphColors[grade]}; /* 배경색을 등급별로 설정 */
  font-size: 1rem;
  font-weight: bold;
  border-radius: 15px; /* 모서리를 약간 둥글게 */
  width: 25px;
  height: 25px;
  text-align: center;
`;

const GraphContainer = styled.div`
  width: 100%;
  background-color: ${({ grade }) =>
    GraphColors[grade]}; /* 배경색은 등급별로 설정 */
  height: 30px;
  border-radius: 20px;
  overflow: visible; /* 그래프 밖으로 삐져나올 수 있도록 설정 */
  position: relative;
  margin: 15px 0px;
`;

const GraphFill = styled.div.attrs(({ fillpercent }) => ({
  style: {
    width: `calc(${fillpercent}% - 10px)`,
  },
}))`
  background-color: ${({ grade }) =>
    darken(0.2, GraphColors[grade])}; /* 더 진한 색 */
  height: 100%;
  border-radius: 20px;
  transition: width 2s ease; /* 부드러운 채우기 애니메이션 */
  position: relative;
  display: flex;
  justify-content: flex-end; /* Radish가 항상 오른쪽 끝에 위치 */
  align-items: center; /* Radish를 세로로 중앙 정렬 */
`;

const Radish = styled.img`
  height: 60px; /* 그래프 밖으로 삐져나오도록 큰 크기 설정 */
  position: absolute;
  top: -23px; /* 그래프 위쪽으로 조금 삐져나오도록 조정 */
  transition: left 2s ease;
  transform: translateX(35px); /* 오른쪽으로 약간 이동 */
`;

const CreditText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  font-size: 1rem;
  font-weight: 600;
`;

function CreditScore() {
  const [creditInfo, setCreditInfo] = useState({
    ratingName: "A",
    ratingPercent: 100,
  });
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCreditRate();

        const ratingPercent = data.ratingPercent;
        const ratingName = data.ratingName || "E";

        setCreditInfo({
          ratingName,
          ratingPercent,
        });
      } catch (error) {
        setError(
          "신용 정보를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요."
        );
        setCreditInfo({
          ratingName: "E",
          ratingPercent: 0,
        });
      }
    };

    fetchData();
  }, []);

  console.log("Credit Info:", creditInfo);

  // 다음 등급 달성시 까지
  const remainingPercent = 100 - creditInfo.ratingPercent;

  // 다음 등급 결정
  const nextGrade = NextGrade[creditInfo.ratingName];

  // text 어떻게 띄울건지
  const displayText =
    creditInfo.ratingName === "A" && creditInfo.ratingPercent >= 100
      ? "최고 등급 달성"
      : `${nextGrade}등급까지 ${remainingPercent.toFixed(0)}점`;

  return (
    <Container>
      <SubHeader>
        <SubTitle>나의 신용등급</SubTitle>
        <CreditLevel grade={creditInfo.ratingName}>
          {creditInfo.ratingName}
        </CreditLevel>
      </SubHeader>
      <GraphContainer grade={creditInfo.ratingName}>
        <GraphFill
          grade={creditInfo.ratingName}
          fillpercent={creditInfo.ratingPercent}
        >
          <Radish src={radish} alt="Radish" />
        </GraphFill>
      </GraphContainer>
      <CreditText>{displayText}</CreditText>
    </Container>
  );
}

export default CreditScore;
