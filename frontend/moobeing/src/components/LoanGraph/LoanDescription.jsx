import styled from "styled-components";
import { useParams } from "react-router-dom";

const Container = styled.div`
  background-color: #f5fded;
  height: 320px;
  width: 90%;
  max-width: 1200px; /* 최대 너비 설정 */
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 8%;
  box-sizing: border-box;
  border-radius: 5%;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const SubSubTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

function LoanDescription() {
  const { loanName } = useParams();

  return (
    <Container>
      <SubHeader>
        <SubTitle>{loanName}</SubTitle>
        <SubSubTitle>상세 정보</SubSubTitle>
      </SubHeader>
    </Container>
  );
}

export default LoanDescription;
