import styled from "styled-components";
import HomeIcon from "../../assets/HomeButton.svg";
import JourneyIcon from "../../assets/JourneyButton.svg";
import ConsumeIcon from "../../assets/ConsumeButton.svg";
import RadishIcon from "../../assets/RadishButton.svg";

const StyledFooter = styled.div`
  align-items: center;
  display: flex;
  gap: 54px;
  height: 77px;
  justify-content: center;
  padding: 15px 18px;
  position: relative;
  width: 360px;

  & .rectangle {
    background-color: #ffffff;
    border-radius: 0px 0px 20px 20px;
    box-shadow: 0px -2px 4px #00000040;
    height: 77px;
    left: 0;
    position: absolute;
    top: 0;
    width: 360px;
  }

  & .div {
    height: 46px;
    position: relative;
    width: 33px;
  }

  & .text-wrapper {
    color: #7a7a7a;
    font-family: "NanumSquare-Bold", Helvetica;
    font-size: 13px;
    font-weight: 700;
    left: 0;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    text-align: center;
    top: 32px;
    white-space: nowrap;
    width: 31px;
  }

  & .home {
    height: 28px;
    left: 1px;
    position: absolute;
    top: 0;
    width: 29px;
  }

  & .journey {
    height: 27px;
    left: 2px;
    position: absolute;
    top: -2px;
    width: 27px;
  }

  & .text-wrapper-2 {
    color: #7a7a7a;
    font-family: "NanumSquare-Bold", Helvetica;
    font-size: 13px;
    font-weight: 700;
    left: 0;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    text-align: center;
    top: 31px;
    white-space: nowrap;
    width: 31px;
  }

  & .consume {
    height: 24px;
    left: 0;
    position: absolute;
    top: 4px;
    width: 30px;
  }

  & .radish {
    height: 24px;
    left: 2px;
    position: absolute;
    top: 0;
    width: 27px;
  }

  & .text-wrapper-3 {
    color: #7a7a7a;
    font-family: "NanumSquare-Bold", Helvetica;
    font-size: 13px;
    font-weight: 700;
    left: 0;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    text-align: center;
    top: 30px;
    width: 31px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="rectangle" />
      <div className="div">
        <img className="home" alt="home" src={HomeIcon} />
        <div className="text-wrapper">홈</div>
      </div>
      <div className="div">
        <img className="journey" alt="journey" src={JourneyIcon} />
        <div className="text-wrapper-2">여정</div>
      </div>
      <div className="div">
        <img className="consume" alt="consume" src={ConsumeIcon} />
        <div className="text-wrapper">소비</div>
      </div>
      <div className="div">
        <img className="radish" alt="radish" src={RadishIcon} />
        <div className="text-wrapper-3">무들</div>
      </div>
    </StyledFooter>
  );
};

export default Footer;