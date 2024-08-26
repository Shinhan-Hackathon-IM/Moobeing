import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // REACT_APP_BASE_URL 대신 VITE_APP_BASE_URL 사용
});

// 1. 퀴즈 불러오기
export const getQuizzes = async () => {
  try {
    const response = await api.get("/quiz");
    return response.data.data;
  } catch (error) {
    console.error("퀴즈 불러오기 실패:", error);
    throw error;
  }
};

// 2. 정답 보내기
export const submitAnswer = async (quizNum, answer) => {
  try {
    const response = await api.post(`/quiz/${quizNum}`, { answer });
    return response.data;
  } catch (error) {
    console.error("정답 제출 실패:", error);
    throw error;
  }
};

// 3. 정답 결과 가져오기 (엔드포인트가 명확하지 않아 임의로 설정했습니다)
export const getQuizResult = async (quizNum) => {
  try {
    const response = await api.get(`/quiz/${quizNum}/result`);
    return response.data;
  } catch (error) {
    console.error("정답 결과 가져오기 실패:", error);
    throw error;
  }
};

// 4. 미해결 퀴즈 확인
export const checkUnsolvedQuiz = async () => {
  try {
    const response = await api.get("/quiz/cold");
    return response.data;
  } catch (error) {
    console.error("미해결 퀴즈 확인 실패:", error);
    throw error;
  }
};
