import { create } from "zustand";

// Zustand 스토어 생성
const useUserStore = create((set) => ({
  userInfo: null, // 사용자 정보를 저장할 상태
  isLoading: true, // 로딩 상태를 저장할 상태
  creditRate: null, // 신용등급 정보를 저장할 상태

  // 사용자 정보를 설정하는 액션
  setUserInfo: (info) => set({ userInfo: info, isLoading: false }),

  setLoading: (loading) => set({ isLoading: loading }), // 로딩 상태 설정 함수

  // 신용등급 정보를 설정하는 액션
  setCreditRate: (rate) => set({ creditRate: rate }),

  // 로그아웃 기능: 사용자 정보를 초기화
  logout: () => set({ userInfo: null, creditRate: null }),
}));

export default useUserStore;
