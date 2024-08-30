import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
});

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

// 대출금 상환하기
export const postAccountLoan = async () => {
  try {
    const response = await api.post("/account");
    return response.data;
  } catch (error) {
    console.error("대출금 상환 실패:", error);
    throw error;
  }
};

// 대출금 상환시 얻을 수 있는 이익 계산
export const getAccountBenefit = async () => {
  try {
    const response = await api.get("/account/benefit");
    return response.data;
  } catch (error) {
    console.error("대출금 상환시 얻을 수 있는 이익 계산 실패:", error);
    throw error;
  }
};
