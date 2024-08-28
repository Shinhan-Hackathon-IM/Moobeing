import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
});

// 퀴즈 전체 목록 불러오기
// const getAllQuizzes = async () => {
//   try {
//     const response = await api.get("/quiz");
//     return response.data.data;
//   } catch (error) {
//     console.error("전체 퀴즈 목록 조회 실패:", error);
//     throw error;
//   }
// };

// 풀지 않은 퀴즈가 존재하는지 확인하고 있으면 퀴즈 가지고 오기
// export const getNotStartedQuiz = async () => {
//   try {
//     const allQuizzes = await getAllQuizzes();
//     const notStartedQuiz = allQuizzes.find(
//       (quiz) => quiz.status === "NOT_STARTED"
//     );

//     if (notStartedQuiz) {
//       const quizData = await getQuizz(notStartedQuiz.quizNum);
//       return quizData;
//     } else {
//       console.log("시작되지 않은 퀴즈가 없습니다.");
//       return null;
//     }
//   } catch (error) {
//     console.error("시작되지 않은 퀴즈 조회 실패:", error);
//     throw error;
//   }
// };

// 1. 퀴즈 불러오기

// export const getQuizz = async () => {
//   try {
//     const response = await api.get("/quiz");
//     return response.data;
//   } catch (error) {
//     console.error("퀴즈 정보 불러오기 실패:", error);
//     throw error;
//   }
// };

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

// 3. 정답 결과 가져오기
export const getQuizResult = async (quizNum) => {
  try {
    const response = await api.get(`/quiz/${quizNum}`);
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
