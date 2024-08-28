import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoanList from "./LoanList";
import goToJourney from "../../assets/button/goToJourney.svg";

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  height: 900px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 8% 8% 5% 8%;
  box-sizing: border-box;
  margin-top: 5%;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5%;
`;

const SubTitle = styled.h2`
  margin: 0;
`;

const SortButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SortButton = styled.p`
  margin: 0;
  font-size: 12px;
  padding: 5px;
  cursor: pointer;
  background-color: ${(props) =>
    props.isactive === "true" ? "#348833" : "#e0eed2"};
  color: ${(props) => (props.isactive === "true" ? "#ffffff" : "#000000")};
  border-radius: 10px;
`;

const TotalLoan = styled.h2`
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0;
`;

const NavigateButton = styled.button`
  margin-left: 5px;
  margin-top: 4px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-weight: 800;
  font-family: Nanum Gothic;
`;

const NavigateImage = styled.img`
  width: 20px;
  height: 20px;
`;

const LoanListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

function LoanHistory() {
  const [loans, setLoans] = useState([]);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const [activeSort, setActiveSort] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating API call to fetch loan data
    const fetchData = async () => {
      // Replace this with actual API call
      const response = {
        total_loan_amount: 3120100212,
        currency: "KRW",
        loan_details: [
          {
            user_deposit_id: 1,
            loan_type: "참대출",
            loan_amount: 1141824,
            bank_name: "Bank1",
            interest_rate: 23.342,
            bank_logo_url: "https://example.com/logos/bank1.png",
          },
          {
            user_deposit_id: 2,
            loan_type: "대출 그만 대출",
            loan_amount: 21241824,
            bank_name: "Bank1",
            interest_rate: 34.343,
            bank_logo_url: "https://example.com/logos/bank1.png",
          },
          {
            user_deposit_id: 3,
            loan_type: "자고 싶다 대출",
            loan_amount: 3141824,
            interest_rate: 12.342,
            bank_name: "Bank1",
            bank_logo_url: "https://example.com/logos/bank1.png",
          },
          {
            user_deposit_id: 4,
            loan_type: "자고 싶다 대출",
            loan_amount: 3141824,
            interest_rate: 12.342,
            bank_name: "Bank1",
            bank_logo_url: "https://example.com/logos/bank1.png",
          },
          {
            user_deposit_id: 5,
            loan_type: "자고 싶다 대출",
            loan_amount: 3141824,
            interest_rate: 12.342,
            bank_name: "Bank1",
            bank_logo_url: "https://example.com/logos/bank1.png",
          },
        ],
        filters: {
          sort_by: ["interest_rate", "loan_amount"],
        },
      };

      setLoans(response.loan_details);
      setTotalLoanAmount(response.total_loan_amount);
    };

    fetchData();
  }, []);

  const sortByInterestRate = () => {
    const sortedLoans = [...loans].sort(
      (a, b) => b.interest_rate - a.interest_rate
    );
    setLoans(sortedLoans);
    setActiveSort("interest");
  };

  const sortByLoanMoney = () => {
    const sortedLoans = [...loans].sort(
      (a, b) => b.loan_amount - a.loan_amount
    );
    setLoans(sortedLoans);
    setActiveSort("amount");
  };

  const navigateToTotalJourney = () => {
    navigate("/total-journey");
  };

  return (
    <Container>
      <SubHeader>
        <SubTitle>나의 대출현황</SubTitle>
        <SortButtonContainer>
          <SortButton
            onClick={sortByInterestRate}
            isactive={activeSort === "interest" ? "true" : "false"}
          >
            금리순
          </SortButton>
          <SortButton
            onClick={sortByLoanMoney}
            isactive={activeSort === "amount" ? "true" : "false"}
          >
            금액순
          </SortButton>
        </SortButtonContainer>
      </SubHeader>
      <TotalLoan>
        {totalLoanAmount.toLocaleString()} 원
        <NavigateButton onClick={navigateToTotalJourney}>
          <NavigateImage src={goToJourney} alt="여정지도" />
        </NavigateButton>
      </TotalLoan>
      <LoanListContainer>
        <LoanList loans={loans} />
      </LoanListContainer>
    </Container>
  );
}

export default LoanHistory;
