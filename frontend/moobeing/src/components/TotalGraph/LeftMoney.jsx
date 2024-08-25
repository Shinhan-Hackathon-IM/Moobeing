import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 사용

const Container = styled.div`
  background-color: #f5fded;
  height: 300px;
  width: 100%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const PayButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
`;

const DropDown = styled.select`
  margin-left: 5px;
  padding: 5px;
  font-size: 1rem;
`;

function LeftMoney() {
  const [selectedLoan, setSelectedLoan] = useState(""); // 선택된 대출 상품 상태
  const navigate = useNavigate(); // useNavigate 훅 사용

  const loans = [
    { id: 1, name: "참대출" },
    { id: 2, name: "신한 대출" },
    { id: 3, name: "우리 대출" },
  ];

  const handleLoanChange = (e) => {
    setSelectedLoan(e.target.value);
  };

  const handlePayment = () => {
    if (selectedLoan) {
      // 선택된 대출 상품을 Params로 전달하여 이동
      navigate(`/payment/${selectedLoan}`);
    } else {
      alert("대출 상품을 선택해주세요.");
    }
  };

  return (
    <Container>
      <Header>
        <SubTitle>남은돈 관리하기 </SubTitle>
      </Header>

      <p>
        남은 돈 230,000원을{" "}
        <DropDown value={selectedLoan} onChange={handleLoanChange}>
          <option value="">대출 상품 선택</option>
          {loans.map((loan) => (
            <option key={loan.id} value={loan.id}>
              {loan.name}
            </option>
          ))}
        </DropDown>{" "}
        에 상환하면 이자 2,324원을 아낄 수 있어요
      </p>

      {/* 상환하러 가기 버튼 */}
      <PayButton onClick={handlePayment}>상환하러 가기</PayButton>
    </Container>
  );
}

export default LeftMoney;
