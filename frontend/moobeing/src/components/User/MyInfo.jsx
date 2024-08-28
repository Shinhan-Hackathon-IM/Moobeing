import PropTypes from "prop-types";
import styled from "styled-components";
import useUserStore from "../../store/UserStore";
import { getUserInfo } from "../../apis/UserApi";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const PasswordChangebutton = styled.button`
  padding: 10px;
  background-color: #e0eed2;
  color: #24272d;
  border: none;
  cursor: pointer;
  border-radius: 20px;
`;

const SubHeader = styled.div`
  background-color: #f5fded;
  height: 8vh;
  width: 90%;
  margin-bottom: 5%;
  margin-top: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 90%;
  box-sizing: border-box;
`;

const SubTitle = styled.h3`
  margin-bottom: 4vh;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

const Label = styled.div`
  font-weight: bold;
`;

const Value = styled.div`
  text-align: right;
`;

const LogoutButton = styled.div`
  height: 10%;
  width: 25%;
  border-radius: 20px;
  margin-top: 15vh;
  margin-bottom: 5px;
  padding: 10px 20px;
  background-color: #e0eed2;
  color: #24272d;
  font-size: 15px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MyInfo = ({ onPasswordChangeClick }) => {
  // Zustand 스토어에서 사용자 정보 가져오기
  const userInfo = useUserStore((state) => state.userInfo);
  // Zustand 스토어에서 setUserInfo 함수 가져오기
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserInfo(); // 사용자 정보 가져오기
        setUserInfo(userData); // Zustand 스토어에 저장
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchData();
  }, [setUserInfo]);

  console.log(userInfo);

  // 더미 데이터 생성
  const userData = {
    email: "ssafy11@shinhan.com",
    totalPoints: 1500,
    totalLoan: "300,000",
    name: "제갈싸피",
    gender: "M",
    birthday: "2000-01-01",
    phoneNumber: "010-1234-5678",
  };

  return (
    <Container>
      <SubHeader>
        <span>{userData.name}님</span>
        <PasswordChangebutton onClick={onPasswordChangeClick}>
          비밀번호 변경
        </PasswordChangebutton>
      </SubHeader>
      <Contents>
        <SubTitle>개인정보</SubTitle>
        <InfoRow>
          <Label>이메일</Label>
          <Value>{userData.email}</Value>
        </InfoRow>
        <InfoRow>
          <Label>생년월일</Label>
          <Value>{userData.birthday}</Value>
        </InfoRow>
        <InfoRow>
          <Label>휴대폰 번호</Label>
          <Value>{userData.phoneNumber}</Value>
        </InfoRow>
        <InfoRow>
          <Label>성별</Label>
          <Value>{userData.gender === "M" ? "남성" : "여성"}</Value>
        </InfoRow>
      </Contents>
      <LogoutButton>로그아웃</LogoutButton>
    </Container>
  );
};

MyInfo.propTypes = {
  onPasswordChangeClick: PropTypes.func.isRequired,
};

export default MyInfo;
