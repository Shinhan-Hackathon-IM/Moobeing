import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15vh;
  width: 100%;
  box-sizing: border-box;
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

const ChangeButton = styled.button`
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
  margin: 18vh 0 8vh 0;
  border: none;
`;

const PasswordMismatchMessage = styled.div`
  display: flex;
  justify-content: end;
  color: #f15e5e;
  font-family: "Inter-Regular", Helvetica;
  font-size: 9px;
  font-weight: 400;
  margin-top: 5px;
  margin-right: 8vh;
  width: 100%;
`;

const PasswordChange = () => {
  const [oldPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    // Reset mismatch state when new password is changed
    setPasswordMismatch(false);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
    // Check if new password and confirm password match
    if (newPassword !== e.target.value) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handleChangePassword = () => {
    if (passwordMismatch) {
      console.log("패스워드 틀림!");
      return;
    }
    // Add your password change logic here
    console.log("패스워드 잘 바뀐다잉");
  };

  return (
    <Container>
      <h1>비밀번호 변경하기</h1>
      <InputText
        type="password"
        placeholder="기존 비밀번호"
        value={oldPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <InputText
        type="password"
        placeholder="새 비밀번호"
        value={newPassword}
        onChange={handleNewPasswordChange}
      />
      <InputText
        type="password"
        placeholder="새 비밀번호 확인"
        value={confirmNewPassword}
        onChange={handleConfirmNewPasswordChange}
      />
      {passwordMismatch && (
        <PasswordMismatchMessage>
          비밀번호가 일치하지 않습니다
        </PasswordMismatchMessage>
      )}
      <ChangeButton onClick={handleChangePassword}>변경하기</ChangeButton>
    </Container>
  );
};

export default PasswordChange;
