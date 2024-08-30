import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Header from "../components/Fixed/Header";
import Footer from "../components/Fixed/Footer";
import DropDownArrow from "../assets/dropdown/DropdownArrow.png";
import { getAccountInfo } from "../apis/AccountApi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const RepaymentComponent = styled.div`
  background-color: #f5fded;
  width: 90%;
  height: 50vh;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5%;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-right: 20px;
  white-space: nowrap;
`;

const CustomDropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CustomDropdownHeader = styled.div`
  width: 100%;
  padding: 8px 0;
  font-size: 1rem;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${DropDownArrow});
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 15px 10px;

  &:focus {
    border-bottom: 2px solid #4caf50;
  }
`;

const CustomDropdownList = styled.ul`
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: white;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 10px;
`;

const CustomDropdownItem = styled.li`
  padding: 8px;
  font-size: 1rem;
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

const InputContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;

  &:focus-within {
    border-bottom: 2px solid #4caf50;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 30px 8px 0;
  font-size: 20px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  text-align: right;

  &:focus {
    border-bottom: 2px solid #4caf50;
  }
`;

const CurrencyLabel = styled.span`
  position: absolute;
  right: 10px;
  font-size: 1rem;
  color: #24272d;
  pointer-events: none;
`;

const AmountButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;
`;

const AmountButton = styled.button`
  padding: 6px 8px;
  font-size: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c5e1ab;
  }
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

const Repayment = () => {
  const { selectedLoanId } = useParams();
  // 계좌 정보를 저장할 상태를 정의합니다.
  const [accounts, setAccounts] = useState([]);

  const loans = [
    { id: 1, name: "참대출" },
    { id: 2, name: "신한 대출" },
    { id: 3, name: "우리 대출" },
  ];

  // 컴포넌트가 마운트될 때 API로부터 데이터를 가져옵니다.
  useEffect(() => {
    // 비동기 함수로 데이터를 가져옵니다.
    const fetchAccounts = async () => {
      try {
        // API로부터 데이터를 가져옵니다.
        const response = await getAccountInfo();

        // 가져온 데이터를 원하는 형태로 가공합니다.
        const fetchedAccounts = response.getAccountDtoList.map(
          (account, index) => ({
            id: index + 1, // 고유 id를 부여합니다. (기존 데이터와의 호환을 위해 추가)
            name: `계좌${index + 1} (${account.accountNum})`, // 계좌 이름 형식에 맞추어 데이터 포맷팅
          })
        );

        // 상태를 업데이트합니다.
        setAccounts(fetchedAccounts);
      } catch (error) {
        console.error("계좌 정보를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchAccounts();
  }, []); // 빈 배열을 두 번째 인자로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  const [selectedLoan, setSelectedLoan] = useState(
    loans.find((loan) => loan.id === parseInt(selectedLoanId, 10))?.id || ""
  );
  const [selectedAccount, setSelectedAccount] = useState("");
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [isLoanDropdownOpen, setIsLoanDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const handleLoanSelect = (id) => {
    setSelectedLoan(id);
    setIsLoanDropdownOpen(false);
  };

  const handleAccountSelect = (id) => {
    setSelectedAccount(id);
    setIsAccountDropdownOpen(false);
  };

  const handleRepaymentInputChange = (e) => {
    // 쉼표 제거 후 숫자 변환
    const value = e.target.value.replace(/,/g, "");
    setRepaymentAmount(value === "" ? 0 : parseInt(value, 10));
  };

  const handleAddAmount = (amount) => {
    setRepaymentAmount((prevAmount) => parseInt(prevAmount) + amount * 10000); // Converts amount in 만원 to 원 and adds it to the current amount
  };

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePayment = () => {
    // 지금은 랜덤으로 설정되어있는데 API 받아와서 바꾸기
    const isPaymentSuccessful = Math.random() > 0.5;

    if (isPaymentSuccessful) {
      alert("상환되었습니다!");
    } else {
      alert("상환 실패! 다시 시도해 주세요.");
    }
  };

  return (
    <Container>
      <Header />
      <MainContent>
        <h1>대출 상환</h1>
        <RepaymentComponent>
          <Row>
            <Label>대출상품</Label>
            <CustomDropdownContainer>
              <CustomDropdownHeader
                onClick={() => setIsLoanDropdownOpen(!isLoanDropdownOpen)}
              >
                {loans.find((loan) => loan.id === parseInt(selectedLoan, 10))
                  ?.name || "대출상품 선택"}
              </CustomDropdownHeader>
              {isLoanDropdownOpen && (
                <CustomDropdownList>
                  {loans.map((loan) => (
                    <CustomDropdownItem
                      key={loan.id}
                      onClick={() => handleLoanSelect(loan.id)}
                      selected={selectedLoan === loan.id}
                    >
                      {loan.name}
                    </CustomDropdownItem>
                  ))}
                </CustomDropdownList>
              )}
            </CustomDropdownContainer>
          </Row>

          <Row>
            <Label>출금계좌</Label>
            <CustomDropdownContainer>
              <CustomDropdownHeader
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              >
                {accounts.find(
                  (account) => account.id === parseInt(selectedAccount, 10)
                )?.name || "출금계좌 선택"}
              </CustomDropdownHeader>
              {isAccountDropdownOpen && (
                <CustomDropdownList>
                  {accounts.map((account) => (
                    <CustomDropdownItem
                      key={account.id}
                      onClick={() => handleAccountSelect(account.id)}
                      selected={selectedAccount === account.id}
                    >
                      {account.name}
                    </CustomDropdownItem>
                  ))}
                </CustomDropdownList>
              )}
            </CustomDropdownContainer>
          </Row>

          <Row>
            <Label>상환금액</Label>
            <InputContainer>
              <Input
                type="text"
                value={formatAmount(repaymentAmount)}
                onChange={handleRepaymentInputChange}
                placeholder="0"
              />
              <CurrencyLabel>원</CurrencyLabel>
            </InputContainer>
          </Row>

          <AmountButtons>
            {[1, 5, 10, 100].map((amount) => (
              <AmountButton
                key={amount}
                onClick={() => handleAddAmount(amount)}
              >
                + {amount.toLocaleString()}만
              </AmountButton>
            ))}
            <AmountButton onClick={() => setRepaymentAmount(0)}>
              정정
            </AmountButton>
          </AmountButtons>
          <PayButton onClick={handlePayment}>상환하기</PayButton>
        </RepaymentComponent>
      </MainContent>
      <Footer />
    </Container>
  );
};

export default Repayment;
