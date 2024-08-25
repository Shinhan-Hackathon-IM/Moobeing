import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/ColumnLogo.png";
import auth from "../../assets/button/AuthButton.svg";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 77px;
  position: relative;
  width: 100%;
  box-shadow: 0px -2px 6px #D9D9D9;

  & .logo {
    width: 80px;
    margin-left: 1vh;
  }

  & .auth {
    width: 30px;
    padding: 20px;
    margin-right: 1vh;
    margin-bottom: 1vh;
  }
`;

const Header = () => {

  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate("/")
  };
  
  const handleMyPageClick = () => {
    navigate("/mypage")
  };

  return (
    <StyledHeader>
      <img className="logo" alt="logo" src={logo} onClick={handleHomeClick} />
      <img className="auth" alt="auth" src={auth} onClick={handleMyPageClick}/>
    </StyledHeader>
  );
};

export default Header;