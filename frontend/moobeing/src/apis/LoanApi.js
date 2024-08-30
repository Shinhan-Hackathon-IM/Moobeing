import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
});

// 나의 대출 총금액 확인
export const getLoanSum = async () => {
  try {
    const response = await api.get("/loan/sum");
    return response.data;
  } catch (error) {
    console.error("대출 총금액 불러오기 실패:", error);
    throw error;
  }
};

// 나의 대출 확인
// getLoanSort("rate");   // 대출 정보를 금리에 따라 정렬하여 가져옴
// getLoanSort("amount"); // 대출 정보를 금액에 따라 정렬하여 가져옴
export const getLoanSort = async (sortType) => {
  try {
    const response = await api.get(`/loan?sort=${sortType}`);
    return response.data;
  } catch (error) {
    console.error("대출 정보 불러오기 실패:", error);
    throw error;
  }
};

// 모든 대출 예정지도 월별 확인
export const getAllLoanMapByMonth = async (pageNum) => {
  try {
    const response = await api.get(`/loan/all-map?page=${pageNum}`);
    return response.data;
  } catch (error) {
    console.error("모든 대출 예정지도 정보 불러오기 실패:", error);
    throw error;
  }
};

// 특정 대출 예정지도 월별 확인
export const getLoanMapByProductName = async (loanProductName) => {
  try {
    const response = await api.get(
      `/loan/map?loanProductName=${loanProductName}`
    );
    return response.data;
  } catch (error) {
    console.error("특정 대출 예정지도 정보 불러오기 실패:", error);
    throw error;
  }
};

// 전체 또래 상환 내역 조회
export const getAllLoanBuddy = async () => {
  try {
    const response = await api.get("/loan/all-buddy");
    return response.data;
  } catch (error) {
    console.error("또래 상환 내역 불러오기 실패:", error);
    throw error;
  }
};

// 또래 상환 내역 조회
export const getProductLoanBuddy = async () => {
  try {
    const response = await api.get(`/loan/buddy?loanName=${loanName}`);
    return response.data;
  } catch (error) {
    console.error("또래 상환 내역 불러오기 실패:", error);
    throw error;
  }
};

// 몇 퍼센트 상환했는지 알아보는 API
export const getLoanPercent = async () => {
  try {
    const response = await api.get("/loan/percent");
    return response.data;
  } catch (error) {
    console.error("몇 퍼센트 상환인지 불러오기 실패:", error);
    throw error;
  }
};
