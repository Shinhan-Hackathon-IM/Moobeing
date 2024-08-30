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
export const getLoanMapByProductName = async (loanProductName, pageNum) => {
  try {
    const response = await api.get(
      `/loan/map?loanProductName=${loanProductName}&page=${pageNum}`
    );
    return response.data;
  } catch (error) {
    console.error("특정 대출 예정지도 정보 불러오기 실패:", error);
    throw error;
  }
};

// 또래 상환 내역 조회
export const getLoanBuddy = async () => {
  try {
    const response = await api.get("/loan/buddy");
    return response.data;
  } catch (error) {
    console.error("또래 상환 내역 불러오기 실패:", error);
    throw error;
  }
};

// 상환완료 했을 때 무 뽑기
export const getRandomRadish = async () => {
  try {
    const response = await api.post("/loan/monthClick");
    console.log("무뽑는 axios 함수가 잘잘잘 호출되었습니다.", response.data);
    return response.data;
  } catch (error) {
    console.error("랜덤 무 뽑기 실패:", error);
    throw error;
  }
};

// 상환한 대출의 개수와 가입되어 있는 대출 상품의 개수
// 무뽑기 버튼의 활성화 유무
export const getLoanNumber = async () => {
  try {
    const response = await api.get("/loan/count");
    console.log(response);
    console.log(
      "대출상품 개수 함수 잘잘잘 출력되었습니다 지금 현재 버튼 활성화 유무는:",
      response.data.showButton
    );
    return response.data;
  } catch (error) {
    console.error("대출상품 개수 조회에 실패하였습니다 힝힝", error);
    throw error;
  }
};
