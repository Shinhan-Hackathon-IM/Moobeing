import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import confetti from "canvas-confetti";
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
  transition: filter 0.8s ease;
  ${(props) =>
    props.$blur &&
    css`
      filter: blur(5px) brightness(0.7);
    `}
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
  white-space: nowrap;
`;

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
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

const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -40%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
`;

const CardWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  animation: ${fadeIn} 0.8s ease-out;
`;

const ConfettiCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
`;

function GetRadish() {
  const [pullCount, setPullCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [bottom, setBottom] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const confettiCanvasRef = useRef(null);

  const handlePullRadish = () => {
    if (pullCount < 6) {
      setPullCount((prev) => prev + 1);
      setIsShaking(true);
      setBottom((prev) => prev + 3);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const fireConfetti = () => {
    const myConfetti = confetti.create(confettiCanvasRef.current, {
      resize: true,
      useWorker: true,
    });

    myConfetti({
      particleCount: 100,
      spread: 90,
      origin: { x: 0, y: 0.8 },
    });

    myConfetti({
      particleCount: 100,
      spread: 130,
      origin: { x: 1, y: 0.8 },
    });
  };

  useEffect(() => {
    if (pullCount === 5) {
      setBottom(30);
      setTimeout(() => {
        setShowCard(true);
        fireConfetti();
      }, 500);
    }
  }, [pullCount]);

  return (
    <PageWrapper>
      <Container $blur={showCard}>
        <BasicRadish
          src={basicRad}
          alt="Radish"
          $bottom={bottom}
          $shaking={isShaking}
        />
        <Soil src={soil} alt="Soil" />
        <Text>무를 뽑아주세요</Text>
        <ButtonWrapper>
          <Button onClick={handlePullRadish} disabled={pullCount === 5}>
            <ArrowIcon src={arrow} alt="Arrow Icon" />
          </Button>
        </ButtonWrapper>
      </Container>
      {showCard && (
        <CardWrapper>
          <RadishCard />
        </CardWrapper>
      )}
      <ConfettiCanvas ref={confettiCanvasRef} />
    </PageWrapper>
  );
}

export default GetRadish;
