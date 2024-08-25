import { useState } from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const FixedTitle = styled.div`
  color: #24272D;
  font-size: 28px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 20px;
  position: fixed;
  top: 24vh;
  width: 100%;
  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 93%; /* Adjust the height to account for the fixed title */
  padding-top: 60px; /* This padding makes space for the fixed title */
  overflow-y: auto; /* Enable vertical scrolling */
  position: relative;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const InputGroup = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputGroupEmail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 5px;
`;

const InputGroupHumanNumber = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
`;

const InputLabel = styled.div`
  color: #348833;
  font-family: "Inter-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 5px;
  margin-left: 2px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #348833;
  border-radius: 10px;
  font-size: 12px;
  font-family: "Inter-Regular", Helvetica;
  outline-color: #E0EED2;
  box-sizing: border-box;
`;

const HumanInput = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 7px;
  border: 1px solid #348833;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HumanInputField = styled.input`
  width: 100%;
  padding: 2.5px 5px 0px 5px;
  text-align: center;
  font-size: 12px;
  font-family: "Inter-Regular", Helvetica;
  border: none;
  outline: none;
  box-sizing: border-box;
`;

const MaskedDisplay = styled.div`
  width: 85%;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-family: "Inter-Regular", Helvetica;
  box-sizing: border-box;
  background-color: #ffffff;
  text-align: center;
  color: #000000;
  letter-spacing: 0.5vh;
`;

const PasswordNote = styled.p`
  display: flex;
  justify-content: flex-end;
  color: #f15e5e;
  font-family: "Inter-Regular", Helvetica;
  font-size: 9px;
  font-weight: 400;
  margin-top: 5px;
  width: 100%;
`;

const PasswordMismatchMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #f15e5e;
  font-family: "Inter-Regular", Helvetica;
  font-size: 9px;
  font-weight: 400;
  margin-top: 5px;
  width: 100%;
`;

const PasswordConfirmGroup = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ConfirmButton = styled.button`
  height: 44px;
  width: 80px;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #E0EED2;
  border-radius: 10px;
  border: none;
`;

const ConfirmButtonText = styled.div`
  color: #348833;
  font-family: "Inter-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
`;

const SignUpButton = styled.button`
  height: 44px;
  width: 45%;
  border-radius: 10px;
  margin-top: 5vh;
  padding: 10px 20px;
  background-color: #E0EED2;
  color: #348833;
  font-size: 13px;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [idNumber, setIdNumber] = useState({ part1: "", part2: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleEnterKeyPress = (e, nextStep) => {
    if (e.key === "Enter") {
      handleNextStep(nextStep);
    }
  };

  const handleNextStep = (nextStep) => {
    setStep(nextStep);
  };

  const handlePasswordConfirm = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMismatch(password !== e.target.value);
  };

  const handleIdPart1Change = (e) => {
    const value = e.target.value.slice(0, 6); // Restrict input to 6 digits
    setIdNumber({ ...idNumber, part1: value });
  };

  const handleIdPart2Change = (e) => {
    const value = e.target.value.slice(0, 1); // Only accept the first digit
    setIdNumber({ ...idNumber, part2: value });
  };

  return (
    <PageWrapper>
      <FixedTitle>회원가입</FixedTitle>
      <Container>
        <Form>
          {step === 1 && (
            <InputGroup>
              <InputLabel>이름</InputLabel>
              <InputField
                type="text"
                placeholder="사용자 이름"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => handleEnterKeyPress(e, 2)}
              />
            </InputGroup>
          )}
          {step === 2 && (
            <InputGroup>
              <InputLabel>주민번호</InputLabel>
              <InputGroupHumanNumber>
                <InputField
                  type="text"
                  placeholder="앞자리"
                  maxLength={6}
                  value={idNumber.part1}
                  onChange={handleIdPart1Change}
                  onKeyDown={(e) => handleEnterKeyPress(e, 3)}
                />
                -
                <HumanInput>
                  <HumanInputField
                    type="text"
                    maxLength={1}
                    value={idNumber.part2}
                    onChange={handleIdPart2Change}
                    onKeyDown={(e) => handleEnterKeyPress(e, 3)}
                  />
                  <MaskedDisplay>●●●●●●</MaskedDisplay>
                </HumanInput>
              </InputGroupHumanNumber>
            </InputGroup>
          )}
          {step >= 3 && (
            <InputGroup>
              <InputLabel>사용할 이메일</InputLabel>
              <InputGroupEmail>
                <InputField
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleEnterKeyPress(e, 4)}
                />
                <ConfirmButton onClick={() => handleNextStep(4)}>
                  <ConfirmButtonText>중복확인</ConfirmButtonText>
                </ConfirmButton>
              </InputGroupEmail>
            </InputGroup>
          )}
          {step >= 4 && (
            <InputGroup>
              <InputLabel>비밀번호</InputLabel>
              <InputField
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleEnterKeyPress(e, 5)}
              />
              <PasswordNote>
                8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요
              </PasswordNote>
            </InputGroup>
          )}
          {step >= 5 && (
            <PasswordConfirmGroup>
              <InputLabel>비밀번호 확인</InputLabel>
              <InputField
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={handlePasswordConfirm}
                onKeyDown={(e) => handleEnterKeyPress(e, 6)}
              />
              {passwordMismatch && (
                <PasswordMismatchMessage>
                  비밀번호가 일치하지 않습니다
                </PasswordMismatchMessage>
              )}
            </PasswordConfirmGroup>
          )}
          {step >= 5 && <SignUpButton>회원 가입하기</SignUpButton>}
        </Form>
      </Container>
    </PageWrapper>
  );
};

export default SignUp;
