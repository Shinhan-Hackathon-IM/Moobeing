import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/button/HomeButton.svg";
import JourneyIcon from "../../assets/button/JourneyButton.svg";
import ConsumeIcon from "../../assets/button/ConsumeButton.svg";
import RadishIcon from "../../assets/button/RadishButton.svg";

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 77px;
  width: 100%;
  position: sticky;
  bottom: -1px;
  background-color: #ffffff;
  box-shadow: 0px -1px 4px #D9D9D9;
  z-index: 1000;

  .footer-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    cursor: pointer;
  }

  .footer-icon {
    width: 28px;
    height: 28px;
  }

  .text-wrapper {
    color: #7a7a7a;
    font-family: "NanumSquare-Bold", Helvetica;
    font-size: 13px;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    margin-top: 4px;
  }

  @media (max-width: 768px) {
    gap: 30px;
    
    .footer-item {
      width: 60px;
    }

    .footer-icon {
      width: 24px;
      height: 24px;
    }

    .text-wrapper {
      font-size: 12px;
    }
  }
`;

const Footer = () => {

  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate("/")
  };
  const handleJourneyClick = () => {
    navigate("/total-journey")
  };
  const handleSpendClick = () => {
    navigate("/spend")
  };
  const handleRadishClick = () => {
    navigate("/radish-collection")
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
