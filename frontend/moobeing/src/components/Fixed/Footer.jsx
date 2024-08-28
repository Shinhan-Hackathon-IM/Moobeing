import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/button/HomeButton.svg";
import JourneyIcon from "../../assets/button/JourneyButton.svg";
import ConsumeIcon from "../../assets/button/ConsumeButton.svg";
import RadishIcon from "../../assets/button/RadishButton.svg";

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly; /* 아이템들을 균등하게 배치 */
  height: 60px; /* 높이 조정 */
  max-width: 500px; /* Footer의 최대 너비 제한 */
  width: 100%;
  position: fixed;
  bottom: 0; /* bottom을 0으로 설정 */
  left: 50%; /* 화면 가운데 정렬을 위해 left와 transform 사용 */
  transform: translateX(-50%);
  background-color: #ffffff;
  box-shadow: 0px -1px 4px #d9d9d9;
  z-index: 1000;

  .footer-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1; /* 아이템들이 균등하게 공간을 차지하도록 설정 */
    padding: 10px 0;
    cursor: pointer;
  }

  .footer-icon {
    width: 24px; /* 아이콘 크기 조정 */
    height: 24px;
  }

  .text-wrapper {
    color: #7a7a7a;
    font-family: "NanumSquare-Bold", Helvetica;
    font-size: 12px; /* 글자 크기 조정 */
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    margin-top: 4px;
  }

  @media (max-width: 768px) {
    height: 50px; /* 모바일에서는 높이를 더 작게 조정 */
    .footer-icon {
      width: 20px;
      height: 20px;
    }
    .text-wrapper {
      font-size: 11px;
    }
  }
`;

const Footer = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };
  const handleJourneyClick = () => {
    navigate("/total-journey");
  };
  const handleSpendClick = () => {
    navigate("/spend");
  };
  const handleRadishClick = () => {
    navigate("/radish-collection");
  };

  return (
    <StyledFooter>
      <div className="footer-item" onClick={handleHomeClick}>
        <img className="footer-icon" alt="home" src={HomeIcon} />
        <div className="text-wrapper">홈</div>
      </div>
      <div className="footer-item" onClick={handleJourneyClick}>
        <img className="footer-icon" alt="journey" src={JourneyIcon} />
        <div className="text-wrapper">여정</div>
      </div>
      <div className="footer-item" onClick={handleSpendClick}>
        <img className="footer-icon" alt="consume" src={ConsumeIcon} />
        <div className="text-wrapper">소비</div>
      </div>
      <div className="footer-item" onClick={handleRadishClick}>
        <img className="footer-icon" alt="radish" src={RadishIcon} />
        <div className="text-wrapper">무들</div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
