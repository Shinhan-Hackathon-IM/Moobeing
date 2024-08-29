import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { useEffect } from "react";
import useUserStore from "./store/UserStore"; // Zustand 스토어 임포트

function Router() {
  const { userInfo, isLoading, setLoading, setUserInfo } = useUserStore(
    (state) => ({
      userInfo: state.userInfo,
      isLoading: state.isLoading,
      setLoading: state.setLoading,
      setUserInfo: state.setUserInfo,
    })
  );

  useEffect(() => {
    // 사용자가 로그인되어 있는지 확인하기 위한 초기화 로직
    const checkUserLoggedIn = async () => {
      setLoading(true);
      // 여기서 사용자 인증 및 정보를 가져오는 로직을 수행
      // 예를 들어, 토큰 유효성 검사 또는 사용자 정보 가져오기

      setTimeout(() => {
        setLoading(false); // 로딩 상태 업데이트 (로그인 확인 로직이 필요)
      }, 1000);
    };

    checkUserLoggedIn();
  }, [setLoading]);

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 로딩 페이지 표시
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 여부에 따라 리디렉션 또는 접근 제어 */}
        <Route
          path="/"
          element={userInfo ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/loading" element={<Loading />} />
        <Route
          path="/loan-journey/:loanId"
          element={userInfo ? <LoanJourney /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!userInfo ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/mypage"
          element={userInfo ? <MyPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/radish-collection"
          element={userInfo ? <RadishCollection /> : <Navigate to="/login" />}
        />
        <Route
          path="/repayment/:selectedLoanId"
          element={userInfo ? <Repayment /> : <Navigate to="/login" />}
        />
        <Route
          path="/spend"
          element={userInfo ? <Spend /> : <Navigate to="/login" />}
        />
        <Route
          path="/total-journey"
          element={userInfo ? <TotalJourney /> : <Navigate to="/login" />}
        />
        <Route
          path="/welcome"
          element={userInfo ? <Welcome /> : <Navigate to="/login" />}
        />
        <Route
          path="/quiz"
          element={userInfo ? <Quiz /> : <Navigate to="/login" />}
        />
        <Route
          path="/quiz/result/:quizId"
          element={userInfo ? <QuizResult /> : <Navigate to="/login" />}
        />
        <Route
          path="/get-radish"
          element={userInfo ? <GetRadish /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
