import styled from "styled-components";
import Logo from "../assets/logo/HorizontalLogo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30vh;
  position: relative;
`;

const LogoImage = styled.img`
  height: 64px;
  object-fit: cover;
  width: 150px;
`;

const InputText = styled.input`
  border: 1px solid #348833;
  border-radius: 10px;
  font-family: "Inter-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  text-align: start;
  width: 80%;
  margin: 8px 0;
  padding: 12px;
  outline-color: #E0EED2;
`;

const LoginButton = styled.button`
  height: 44px;
  width: 40%;
  border-radius: 10px;
  background-color: #E0EED2;
  color: #348833;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 20px;
  border: none;
`;

const PasswordLostContainer = styled.div`
  width: 85%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  font-family: "Inter-Regular", Helvetica;
`;

const PasswordLost = styled.div`
  color: #348833;
  cursor: pointer;
  font-size: 12px;
  margin-bottom: 20px;
`;

const SignUpText = styled.p`
  font-family: "Inter-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const Span = styled.span`
  color: #828282;
`;

const SignupButton = styled.button`
  background: none;
  border: none;
  color: #348833;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  padding: 0;
  margin-left: 5px;
  font-family: "Inter-Regular", Helvetica;
  text-decoration: underline;
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // email을 위한 state
  const [password, setPassword] = useState(""); // password를 위한 state

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    const loginData = {
      email: email,
      password: password,
    };

    console.log("Login data:", loginData);

    // 여기에 post 함수 넣으면 됨
  };

  return (
    <ScreenWrapper>
      <LogoImage alt="Logo" src={Logo} />
      <InputText
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // state 바꾸기
      />
      <InputText
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // state 바꾸기
      />
      <PasswordLostContainer>
        <PasswordLost>비밀번호를 잊으셨나요?</PasswordLost>
      </PasswordLostContainer>
      <LoginButton onClick={handleLogin}>로그인</LoginButton>
      <SignUpText>
        <Span>계정이 없으신가요?</Span>
        <SignupButton onClick={handleSignupClick}>가입하기</SignupButton>
      </SignUpText>
    </ScreenWrapper>
  );
};

export default Login;
