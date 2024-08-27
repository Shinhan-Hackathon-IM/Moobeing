import styled from "styled-components";
import { darken } from "polished"; // polished에서 darken 가져오기
import radish from "../../assets/radishes/basicRad.svg";

// 신용등급별 색상
const GraphColors = {
  A: "#85BD85",
  B: "#C0DDA6",
  C: "#DDD1A6",
  D: "#DDBDA6",
  E: "#DDA6A6",
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
  padding: 2px 6px;
  border-radius: 10px; /* 모서리를 약간 둥글게 */
  width: 15px;
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
    width: `${fillpercent}%`, // Use inline styles to apply the fill width
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
  top: -20px; /* 그래프 위쪽으로 조금 삐져나오도록 조정 */
  transition: left 2s ease;
  transform: translateX(20px); /* 오른쪽으로 약간 이동 */
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  font-size: 1rem;
`;

function CreditScore() {
  const creditLevel = "E"; // 신용등급
  const fillpercent = 50; // 그래프에서 얼마나 채울지 (신용점수에 따라 조정)

  return (
    <Container>
      <SubHeader>
        <SubTitle>나의 신용등급</SubTitle>
        {/* 신용등급에 맞게 CreditLevel의 배경색을 설정하기 위해 grade 속성 추가 */}
        <CreditLevel grade={creditLevel}>{creditLevel}</CreditLevel>
      </SubHeader>
      <GraphContainer grade={creditLevel}>
        <GraphFill grade={creditLevel} fillpercent={fillpercent}>
          <Radish src={radish} alt="Radish" />
        </GraphFill>
      </GraphContainer>
      <Text>A등급까지 435점</Text>
    </Container>
  );
}

export default CreditScore;
