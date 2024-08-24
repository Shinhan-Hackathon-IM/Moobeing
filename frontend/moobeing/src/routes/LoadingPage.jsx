import styled from "styled-components";
import radish from "../assets/RadishSample.png";

const StyledLoading = styled.div`
  background-color: #e0eed2;
  border-radius: 20px;
  height: 800px;
  overflow: hidden;
  position: relative;
  width: 360px;

  & .text-wrapper {
    color: #348833;
    font-family: "Inter-Regular", Helvetica;
    font-size: 12px;
    font-weight: 400;
    left: 116px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    text-align: center;
    top: 438px;
    width: 129px;
  }

  & .element {
    height: 138px;
    left: 134px;
    position: absolute;
    top: 292px;
    width: 92px;
  }
`;

const Loading = () => {
  return (
    <StyledLoading>
      <p className="text-wrapper">
        당신의 대출이 <br />
        ‘무’ 가 되는 그날까지
      </p>
      <img className="element" alt="Element" src={radish} />
    </StyledLoading>
  );
};

export default Loading;