import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/HomePage";
import Loading from "./routes/LoadingPage";
import LoanJourney from "./routes/LoanJourneyPage";
import Login from "./routes/LoginPage";
import MyPage from "./routes/MyPage";
import RadishCollection from "./routes/RadishCollectionPage";
import Repayment from "./routes/RepaymentPage";
import Spend from "./routes/SpendPage";
import TotalJourney from "./routes/TotalJourneyPage";
import Welcome from "./routes/WelcomePage";
import Header from "./components/Fixed/Header";
import Footer from "./components/Fixed/Footer";
import PropTypes from "prop-types";

// 공통 레이아웃 컴포넌트
const DefaultLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

// PropTypes를 사용하여 children prop의 타입을 명시적으로 정의합니다.
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

// 푸터가 없는 레이아웃
const NoFooterLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

NoFooterLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Header와 Footer가 있는 페이지 */}
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="/loan-journey/:loanId" element={<DefaultLayout><LoanJourney /></DefaultLayout>} />
        <Route path="/mypage" element={<DefaultLayout><MyPage /></DefaultLayout>} />
        <Route path="/radish-collection" element={<DefaultLayout><RadishCollection /></DefaultLayout>} />
        <Route path="/repayment" element={<DefaultLayout><Repayment /></DefaultLayout>} />
        <Route path="/spend" element={<DefaultLayout><Spend /></DefaultLayout>} />
        <Route path="/total-journey" element={<DefaultLayout><TotalJourney /></DefaultLayout>} />

        {/* Header와 Footer가 없는 페이지 */}
        <Route path="/loading" element={<NoFooterLayout><Loading /></NoFooterLayout>} />
        <Route path="/login" element={<NoFooterLayout><Login /></NoFooterLayout>} />
        <Route path="/welcome" element={<NoFooterLayout><Welcome /></NoFooterLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
