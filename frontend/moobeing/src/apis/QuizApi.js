import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
});

export const getNotStartedQuiz = async () => {
  try {
    const response = await api.get("/quiz");
    return response.data;
  } catch (error) {
    console.error("퀴즈 정보 불러오기 실패했어요 슬퍼요", error);
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

// // 3. 정답 결과 가져오기
// export const getQuizResult = async (quizNum) => {
//   try {
//     const response = await api.get(`/quiz/${quizNum}`,);
//     return response.data;
//   } catch (error) {
//     console.error("정답 결과 가져오기 실패:", error);
//     throw error;
//   }
// };

// // 4. 미해결 퀴즈 확인
// export const checkUnsolvedQuiz = async () => {
//   try {
//     const response = await api.get("/quiz/cold");
//     return response.data;
//   } catch (error) {
//     console.error("미해결 퀴즈 확인 실패:", error);
//     throw error;
//   }
// };
