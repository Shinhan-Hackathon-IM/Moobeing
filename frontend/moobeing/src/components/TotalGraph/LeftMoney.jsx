import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DropDownArrow from "../../assets/dropdown/DropdownArrow.png";
import { getAccountBenefit } from "../../apis/AccountApi";
import { getLoanSort } from "../../apis/LoanApi";

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
  background-color: #c0dda6;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  transition: all 0.2s ease-in-out; /* 버튼 클릭 시 애니메이션 추가 */

  &:hover {
    background-color: #b5c99a; /* 호버 시 약간 더 어두운 색상 */
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 깊이 변경 */
    transform: translateY(-2px); /* 호버 시 약간 떠오르는 효과 */
  }

  &:active {
    background-color: #a9b98e; /* 클릭 시 더 어두운 색상 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 클릭 시 그림자 효과 줄임 */
    transform: translateY(0); /* 클릭 시 원래 위치로 돌아옴 */
  }
`;

const CustomDropdownContainer = styled.div`
  position: relative;
  width: 170px;
  max-width: 300px; /* 드롭다운의 최대 너비 설정 */
  display: inline-block;
  margin: 10px 0;
`;

const CustomDropdownHeader = styled.div`
  padding: 8px 12px;
  font-size: 1rem;
  background-color: transparent;
  border-bottom: 1px solid #ccc;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url(${DropDownArrow});
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 15px 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &:focus {
    border-bottom: 2px solid #4caf50;
  }
`;

const CustomDropdownList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 150px; /* 최대 높이 설정 */
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const CustomDropdownItem = styled.li`
  padding: 8px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: #c5e1ab;
  }

  ${(props) =>
    props.selected &&
    `
    background-color: #C5E1AB;
    font-weight: bold;
  `}
`;

const TextTag = styled.div`
  text-align: center;
  width: 100%;
`;

const MoneySpan = styled.span`
  font-weight: 700;
`;

const LastLine = styled.div`
  margin: 10px 0px;
`;

function LeftMoney() {
  const [accountBenefit, setAccountBenefit] = useState({});
  const [loanList, setLoanList] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(""); // 선택된 대출 상품 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림 상태
  const [interestBalance, setInterestBalance] = useState(0);
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 컴포넌트가 마운트될 때 대출 목록과 계좌 혜택 데이터를 가져오기
  useEffect(() => {
    // 대출 목록을 rate 파라미터와 함께 가져오기
    getLoanSort("rate")
      .then((response) => {
        const loanNames = response.getMemberLoanDtoList.map((loan) => ({
          name: loan.loanProductName,
          id: loan.loanProductName,
        }));
        setLoanList(loanNames); // 대출 목록 상태 업데이트
      })
      .catch((error) => {
        console.error("대출 목록을 가져오는 중 오류 발생:", error);
      });

    // 계좌 혜택 데이터 가져오기
    getAccountBenefit()
      .then((response) => {
        setAccountBenefit(response); // 계좌 혜택 상태 업데이트
      })
      .catch((error) => {
        console.error("계좌 혜택 데이터를 가져오는 중 오류 발생:", error);
      });
  }, []);

  // 대출 선택 시 호출되는 함수
  const handleLoanChange = (loanName) => {
    setSelectedLoan(loanName); // 선택된 대출 업데이트
    setIsDropdownOpen(false); // 드롭다운 닫기

    // 선택된 대출의 이자 잔액 찾기
    const selectedInterest = accountBenefit?.LoanList?.find(
      (loan) => loan.loanName === loanName
    )?.interestBalance;

    if (selectedInterest !== undefined) {
      setInterestBalance(selectedInterest); // 이자 잔액 상태 업데이트
    }
  };

  // '상환하러 가기' 버튼 클릭 시 호출되는 함수
  const handlePayment = () => {
    if (selectedLoan) {
      navigate(`/repayment/${selectedLoan}`); // 선택된 대출과 함께 이동
    } else {
      alert("대출 상품을 선택해주세요."); // 대출이 선택되지 않았을 때 경고 표시
    }
  };

  return (
    <Container>
      <SubHeader>
        <SubTitle>이번 달 계좌 잔액 관리</SubTitle>
      </SubHeader>

      <TextTag>
        남은 돈 <MoneySpan>230,000원</MoneySpan>을{" "}
        <CustomDropdownContainer>
          <CustomDropdownHeader
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedLoan.length > 8
              ? `${selectedLoan.substring(0, 8)}...`
              : selectedLoan || "대출 상품 선택"}
          </CustomDropdownHeader>
          {isDropdownOpen && (
            <CustomDropdownList>
              {loanList.map((loan) => (
                <CustomDropdownItem
                  key={loan.id}
                  onClick={() => handleLoanChange(loan.name)}
                  selected={selectedLoan === loan.name}
                >
                  {loan.name.length > 12
                    ? `${loan.name.substring(0, 12)}...`
                    : loan.name}
                </CustomDropdownItem>
              ))}
            </CustomDropdownList>
          )}
        </CustomDropdownContainer>{" "}
        에 상환하면,
        <LastLine>
          이자 <MoneySpan>{interestBalance.toLocaleString()}원</MoneySpan>을
          아낄 수 있어요
        </LastLine>
      </TextTag>

      <PayButton onClick={handlePayment}>상환하러 가기</PayButton>
    </Container>
  );
}

export default LeftMoney;
