import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 카테고리 파이차트 그리기
export const getLoanSum = async () => {
  try {
    const response = await api.get("/account/pi");
    return response.data;
  } catch (error) {
    console.error("테고리 파이차트 그리기 실패:", error);
    throw error;
  }
};

// 소비 카테고리별 조회
export const getLoanSort = async (year, month) => {
  try {
    const response = await api.get(
      `/expense/category?year=${year}&month=${month}`
    );
    return response.data;
  } catch (error) {
    console.error("소비 카테고리별 조회 실패:", error);
    throw error;
  }
};

// 일자별 소비내역 조회
export const getAllLoanMapByMonth = async () => {
  try {
    const response = await api.get("/expense");
    return response.data;
  } catch (error) {
    console.error("자별 소비내역 불러오기 실패:", error);
    throw error;
  }
};

// 통장 조회
export const getAccountInfo = async () => {
  try {
    const response = await api.get("/account");
    return response.data;
  } catch (error) {
    console.error("통장 조회 실패:", error);
    throw error;
  }
};
