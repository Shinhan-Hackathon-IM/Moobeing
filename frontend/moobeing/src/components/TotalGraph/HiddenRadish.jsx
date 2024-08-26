import React from "react";
import styled from "styled-components";
import potDefault from "../../assets/pot/potDefault.svg";
import pot2nd from "../../assets/pot/pot2nd.svg";
import pot3rd from "../../assets/pot/pot3rd.svg";
import pot4th from "../../assets/pot/pot4th.svg";
import pot5th from "../../assets/pot/pot5th.svg";
import pot6th from "../../assets/pot/pot6th.svg";

const RadishContainer = styled.div`
  height: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end; // 추가: 내용을 하단에 정렬
`;

const PotRadish = styled.img`
  width: auto;
  height: auto;
  max-width: 150px;
  object-fit: contain;
  margin-bottom: -30px; // 추가: 이미지를 컨테이너 아래로 약간 밀어냄
`;

const PullRadishButton = styled.button`
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  z-index: 3;
`;

function HiddenRadish({ PaidLoanNum, TotalLoanNum }) {
  const getPotImage = () => {
    const images = [potDefault, pot2nd, pot3rd, pot4th, pot5th, pot6th];

    if (PaidLoanNum === 0) return potDefault;
    if (PaidLoanNum === TotalLoanNum) return pot6th;

    let stages;
    switch (TotalLoanNum) {
      case 5:
        stages = [0, 1, 2, 3, 4, 5];
        break;
      case 4:
        stages = [0, 1, 3, 4, 5];
        break;
      case 3:
        stages = [0, 1, 3, 5];
        break;
      case 2:
        stages = [0, 3, 5];
        break;
      case 1:
        stages = [0, 5];
        break;
      default:
        stages = [0, 5];
    }

    const currentStageIndex = Math.min(PaidLoanNum, stages.length - 1);
    return images[stages[currentStageIndex]];
  };

  const isComplete = PaidLoanNum === TotalLoanNum;

  return (
    <RadishContainer>
      <PotRadish src={getPotImage()} alt="Radish pot" />
      {isComplete && <PullRadishButton>무뽑기</PullRadishButton>}
    </RadishContainer>
  );
}

export default HiddenRadish;
