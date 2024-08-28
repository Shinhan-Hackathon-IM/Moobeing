// S, A, B 등급으로 데이터 받음
// 최광민이 할거야

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL + "/user",
  withCredentials: true,
});

// 1. 사용자 무 컬렉션 확인
export const getUserRadishCollection = async () => {
  try {
    const response = await api.get("/radish");
    return response.data;
  } catch (error) {
    console.error("사용자 무 컬렉션 확인:", error);
    throw error;
  }
};

// 2. 사용자 무 변경하기
export const selectRadish = async (radishName) => {
  try {
    const response = await api.post("/select", { radishName: radishName });
    return response.data;
  } catch (error) {
    console.error("사용자 무 변경 실패!:", error);
    throw error;
  }
};

// 3. 맴버 무 뽑기
export const getQuizResult = async () => {
  try {
    const response = await api.post("/radish");
    return response.data;
  } catch (error) {
    console.error("정답 결과 가져오기 실패:", error);
    throw error;
  }
};

// 4. 사용자 애기 무 추가
export const checkUnsolvedQuiz = async () => {
  try {
    const response = await api.post("/baby");
    return response.data;
  } catch (error) {
    console.error("미해결 퀴즈 확인 실패:", error);
    throw error;
  }
};

// default export로 내보내기
export default getUserRadishCollection;
