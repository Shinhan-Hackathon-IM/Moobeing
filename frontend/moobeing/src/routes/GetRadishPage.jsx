import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import soil from "../assets/pot/soill.png";
import basicRad from "../assets/radishes/basicRad.svg";
import arrow from "../assets/quiz/upArrow.svg";
import RadishCard from "../components/PullRadish/RadishCard";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  background-color: #d2ebee;
`;

const Soil = styled.img`
  width: 100%;
  height: auto;
  bottom: 0;
  z-index: 1;
`;

const shakeAnimation = keyframes`
  0% { transform: translateX(-50%) rotate(0deg); }
  25% { transform: translateX(-50%) rotate(5deg); }
  50% { transform: translateX(-50%) rotate(0deg); }
  75% { transform: translateX(-50%) rotate(-5deg); }
  100% { transform: translateX(-50%) rotate(0deg); }
`;

const BasicRadish = styled.img`
  position: absolute;
  bottom: ${(props) => props.$bottom}%;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: auto;
  z-index: 0;
  transition: bottom 0.5s ease-out;
  ${(props) =>
    props.$shaking &&
    css`
      animation: ${shakeAnimation} 0.5s ease-in-out;
    `}
`;

const Text = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 35px;
  text-align: center;
  white-space: nowrap; /* 줄 바꿈 없이 한 줄로 처리 */
`;

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
`;

const Button = styled.button`
  border-radius: 10px;
  width: 104px;
  height: 70px;
  background-color: #ffbdbd;
  cursor: pointer;
  outline: none;
  box-shadow: 4px 7px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.2s;
  margin-bottom: 500px;

  &:active {
    box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
    top: 2px;
  }
`;

const ArrowIcon = styled.img`
  width: 40px;
  height: 40px;
`;

function GetRadish() {
  const [pullCount, setPullCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [bottom, setBottom] = useState(0);

  const handlePullRadish = () => {
    if (pullCount < 3) {
      setPullCount((prev) => prev + 1);
      setIsShaking(true);
      setBottom((prev) => prev + 3); // 85% / 3 ≈ 28.33%
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  useEffect(() => {
    if (pullCount === 3) {
      setBottom(30);
    }
  }, [pullCount]);

  return (
    <PageWrapper>
      <Container>
        <BasicRadish
          src={basicRad}
          alt="Radish"
          $bottom={bottom}
          $shaking={isShaking}
        />
        <Soil src={soil} alt="Soil" />
        <Text>무를 뽑아주세요</Text>
      </Container>
      <ButtonWrapper>
        <Button onClick={handlePullRadish}>
          <ArrowIcon src={arrow} alt="Arrow Icon" />
        </Button>
      </ButtonWrapper>
    </PageWrapper>
  );
}

export default GetRadish;
