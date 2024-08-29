import { useState } from "react";
import styled from "styled-components";
import { postSignUp, postEmailCheck } from "../apis/UserApi";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const FixedTitle = styled.div`
  color: #24272d;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  position: fixed;
  top: 15vh;
  width: 100%;
  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 93%;
  padding-top: 60px;
  overflow-y: auto;
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
`;

const InputLabel = styled.div`
  color: #348833;
  font-family: "Inter-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 8px;
  margin-left: 2px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #348833;
  border-radius: 10px;
  font-size: 15px;
  font-family: "Inter-Regular", Helvetica;
  outline-color: #e0eed2;
  box-sizing: border-box;
  letter-spacing: 1px;
`;

const HumanInputField = styled.input`
  width: 40px;
  padding: 12px 0px;
  border: 1px solid #348833;
  outline-color: #e0eed2;
  border-radius: 10px;
  text-align: center;
  font-size: 15px;
  font-family: "Inter-Regular", Helvetica;
  box-sizing: border-box;
  letter-spacing: 1px;
`;

const MaskedDisplay = styled.div`
  width: 80%;
  border: none;
  border-radius: 10px;
  font-size: 25px;
  font-family: "Inter-Regular", Helvetica;
  box-sizing: border-box;
  background-color: #ffffff;
  text-align: center;
  color: #000000;
  letter-spacing: 1px;

  @media (min-width: 500px) {
    font-size: 40px;
    letter-spacing: 10px;
  }
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const NextButton = styled.button`
  height: 44px;
  width: 46%;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #e0eed2;
  border-radius: 10px;
  border: none;
`;

const PrevButton = styled.button`
  height: 44px;
  width: 46%;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #f3f8ed;
  border-radius: 10px;
  border: none;
`;

const ConfirmButton = styled.button`
  height: 44px;
  width: 80px;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #e0eed2;
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
  background-color: #e0eed2;
  color: #348833;
  font-size: 13px;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [humanNumber, setHumanNumber] = useState({ part1: "", part2: "" });
  const [email, setEmail] = useState("");
  const [isEmailAvailable, setIsEmailAvailable] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false); // 이메일 중복 체크 여부 상태 추가

  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const handleEnterKeyPress = (e, nextStep) => {
    if (e.key === "Enter") {
      handleNextStep(nextStep);
    }
  };

  const handleNextStep = (nextStep) => {
    // 주민번호가 다 채워지지 않으면 경고
    if (
      step === 2 &&
      (humanNumber.part1.length !== 6 || humanNumber.part2.length !== 1)
    ) {
      alert("주민번호를 모두 입력해 주세요.");
      return;
    }

    setStep(nextStep);
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePasswordConfirm = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMismatch(password !== e.target.value);
  };

  const handleHumanNumberPart1Change = (e) => {
    const value = e.target.value.slice(0, 6);
    if (/^\d*$/.test(value)) {
      setHumanNumber({ ...humanNumber, part1: value });
    } else {
      alert("주민번호는 숫자만 입력할 수 있습니다.");
    }
  };

  const handleHumanNumberPart2Change = (e) => {
    const value = e.target.value.slice(0, 1);
    if (/^\d*$/.test(value)) {
      setHumanNumber({ ...humanNumber, part2: value });
    } else {
      alert("주민번호는 숫자만 입력할 수 있습니다.");
    }
  };

  const handleEmailCheck = async () => {
    try {
      const response = await postEmailCheck(email);
      setIsEmailAvailable(response.possibility);
      setEmailChecked(true); // 이메일 중복 체크 완료로 설정
      if (!regEmail.test(email)) {
        alert("이메일 형식에 따라 정확히 입력해주세요");
        return;
      } else {
        if (response.possibility) {
          alert("이메일을 사용할 수 있습니다.");
          handleNextStep(4);
        } else {
          alert("이미 사용 중인 이메일입니다.");
        }
      }
    } catch (error) {
      console.error("이메일 중복 체크 실패:", error);
      alert("이메일 중복 체크 중 오류가 발생했습니다.");
    }
  };

  const handleSignUp = async () => {
    // 비밀번호가 일치하지 않으면 회원가입을 막고 경고
    if (passwordMismatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 이메일 중복 확인이 되지 않았거나, 중복된 이메일일 경우 회원가입을 막고 경고
    if (!emailChecked || !isEmailAvailable) {
      alert("이메일 중복 확인을 완료해 주세요.");
      return;
    }

    const formattedHumanNumber = `${humanNumber.part1}${humanNumber.part2}`;

    const signUpData = {
      email,
      password,
      name,
      humanNumber: formattedHumanNumber,
    };

    console.log(signUpData);

    try {
      const response = await postSignUp(
        email,
        password,
        name,
        formattedHumanNumber
      );
      console.log("회원가입 성공:", response);
      navigate("/");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const goToLogin = () => {
    navigate("/login");
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => handleEnterKeyPress(e, 2)}
              />
              <ButtonGroup>
                <PrevButton onClick={goToLogin}>이전</PrevButton>
                <NextButton onClick={() => handleNextStep(2)}>다음</NextButton>
              </ButtonGroup>
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
                  value={humanNumber.part1}
                  onChange={handleHumanNumberPart1Change}
                  onKeyDown={(e) => handleEnterKeyPress(e, 3)}
                />
                -
                <HumanInputField
                  type="text"
                  maxLength={1}
                  value={humanNumber.part2}
                  onChange={handleHumanNumberPart2Change}
                  onKeyDown={(e) => handleEnterKeyPress(e, 3)}
                />
                <MaskedDisplay>●●●●●●</MaskedDisplay>
              </InputGroupHumanNumber>
              <ButtonGroup>
                <PrevButton onClick={handlePreviousStep}>이전</PrevButton>
                <NextButton onClick={() => handleNextStep(3)}>다음</NextButton>
              </ButtonGroup>
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
                <ConfirmButton onClick={handleEmailCheck}>
                  <ConfirmButtonText>중복확인</ConfirmButtonText>
                </ConfirmButton>
              </InputGroupEmail>
            </InputGroup>
          )}
          {step >= 4 && (
            <>
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
              <SignUpButton onClick={handleSignUp}>회원 가입하기</SignUpButton>
            </>
          )}
        </Form>
      </Container>
    </PageWrapper>
  );
};

export default SignUp;
