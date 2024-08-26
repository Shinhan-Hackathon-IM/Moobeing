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
import Quiz from "./routes/QuizPage";
import QuizResult from "./routes/QuizResultPage";
import GetRadish from "./routes/GetRadishPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/loan-journey/:loanId" element={<LoanJourney />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/radish-collection" element={<RadishCollection />} />
        <Route path="/repayment" element={<Repayment />} />
        <Route path="/spend" element={<Spend />} />
        <Route path="/total-journey" element={<TotalJourney />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/result" element={<QuizResult />} />
        <Route path="/get-radish" element={<GetRadish />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
