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

const PasswordChangeButton = styled.button`
  padding: 10px;
  background-color: #e0eed2;
  color: #24272d;
  border: none;
  cursor: pointer;
  border-radius: 15px;
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
  padding: 20px 15px 20px 25px;
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
  margin-bottom: 30px;
  padding: 0px 2px;
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
  border-radius: 10px;
  margin-top: 15vh;
  margin-bottom: 5px;
  padding: 10px 20px;
  background-color: #e0eed2;
  color: #24272d;
  font-size: 13px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 600px) {
    font-size: 18px;
  }
`;

// 생년월일을 "YYYY-MM-DD" 형식으로 변환하는 함수
const formatBirthday = (birthday) => {
  if (!birthday || birthday.length !== 6) return "";

  const yearPrefix = parseInt(birthday.slice(0, 2), 10) <= 50 ? "20" : "19"; // 50 이하일 경우 2000년대, 그 이상은 1900년대 가정
  const year = yearPrefix + birthday.slice(0, 2);
  const month = birthday.slice(2, 4);
  const day = birthday.slice(4, 6);

  return `${year}-${month}-${day}`;
};

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

  // 생년월일 형식 변환
  const formattedBirthday = formatBirthday(userInfo.birthday);

  return (
    <Container>
      <SubHeader>
        <strong>{userInfo.name} 님</strong>
        <PasswordChangeButton onClick={onPasswordChangeClick}>
          비밀번호 변경
        </PasswordChangeButton>
      </SubHeader>
      <Contents>
        <SubTitle>개인정보</SubTitle>
        <InfoRow>
          <Label>이메일</Label>
          <Value>{userInfo.email}</Value>
        </InfoRow>
        <InfoRow>
          <Label>생년월일</Label>
          <Value>{formattedBirthday}</Value>
        </InfoRow>
        <InfoRow>
          <Label>성별</Label>
          <Value>{userInfo.gender === "M" ? "남성" : "여성"}</Value>
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
