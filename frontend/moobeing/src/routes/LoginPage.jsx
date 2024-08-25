import styled from "styled-components";
import Logo from "../assets/logo/HorizontalLogo.png";
import { useNavigate } from "react-router-dom";

const ScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30vh;
  position: relative;

  .logo-horizontal {
    height: 64px;
    object-fit: cover;
    width: 150px;
  }

  .input-text {
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
  }

  .login-button {
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
  }

  .password-lost-container {
    width: 85%;
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    font-family: "Inter-Regular", Helvetica;
  }

  .password-lost {
    color: #348833;
    cursor: pointer;
    font-size: 12px;
  }

  .span {
    color: #828282;
  }

  .sign-up {
    font-family: "Inter-Regular", Helvetica;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
  }

  .signup-button {
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
  }
`;

const Login = () => {
  const navigate = useNavigate();

const handleSignupClick = () => {
  navigate("/signup");
};

  return (
    <ScreenWrapper>
      <img className="logo-horizontal" alt="Logo" src={Logo} />
      <input type="email" className="input-text" placeholder="이메일" />
      <input type="password" className="input-text" placeholder="비밀번호" />
      <div className="password-lost-container">
        <div className="password-lost">비밀번호를 잊으셨나요?</div>
      </div>
      <div className="login-button">로그인</div>
      <p className="sign-up">
        <span className="span">계정이 없으신가요?</span>
        <button className="signup-button" onClick={handleSignupClick}>
          가입하기
        </button>
      </p>
    </ScreenWrapper>
  );
};

export default Login;
