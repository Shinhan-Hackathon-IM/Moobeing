import styled from "styled-components";
import radish from "../assets/raddishes/basicRad.svg";

const StyledLoading = styled.div`
  background-color: #e0eed2;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & .text-wrapper {
    color: #348833;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: normal;
    text-align: center;
    font-family: 'S-CoreDream';
  }

  & .element {
    height: 138px;
    width: 100px;
  }
`;

const Loading = () => {
  return (
    <StyledLoading>
      <img className="element" alt="Element" src={radish} />
      <p className="text-wrapper">
        당신의 대출이 <br />
        ‘무’ 가 되는 그날까지
      </p>
    </StyledLoading>
  );
};

export default Loading;