import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/HomePage";
import Loading from "./routes/LoadingPage";
import LoanJourney from "./routes/LoanJourneyPage";
import Login from "./routes/LoginPage";
import SignUp from "./routes/SignUpPage";
import MyPage from "./routes/MyPage";
import RadishCollection from "./routes/RadishCollectionPage";
import Repayment from "./routes/RepaymentPage";
import Spend from "./routes/SpendPage";
import TotalJourney from "./routes/TotalJourneyPage";
import Welcome from "./routes/WelcomePage";

function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/loading" element={<Loading />}/>
        <Route path="/loan-journey/:loanId" element={<LoanJourney />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/mypage" element={<MyPage />}/>
        <Route path="/radish-collection" element={<RadishCollection />}/>
        <Route path="/repayment" element={<Repayment />}/>
        <Route path="/spend" element={<Spend />}/>
        <Route path="/total-journey" element={<TotalJourney />}/>
        <Route path="/welcome" element={<Welcome />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;