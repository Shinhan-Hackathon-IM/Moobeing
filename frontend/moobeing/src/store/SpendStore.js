import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getPieChart,
  getSpendCategory,
  getSpendDataByDay,
} from "../apis/SpendApi";

const useSpendStore = create(
  persist(
    (set, get) => ({
      pieChartData: null,
      spendCategoryData: null,
      spendDataByDay: null,
      loading: false,
      error: null,

      fetchPieChartData: async (year, month) => {
        set({ loading: true, error: null });
        try {
          const data = await getPieChart(year, month);
          set({ pieChartData: data });
        } catch (error) {
          set({ error: "파이 차트 데이터 들고오기 실패" });
        } finally {
          set({ loading: false });
        }
      },

      fetchSpendCategoryData: async (year, month) => {
        set({ loading: true, error: null });
        try {
          const data = await getSpendCategory(year, month);
          set({ spendCategoryData: data });
        } catch (error) {
          set({ error: "카테고리 데이터 들고오기 실패" });
        } finally {
          set({ loading: false });
        }
      },

      fetchSpendDataByDay: async (year, month) => {
        set({ loading: true, error: null });
        try {
          const data = await getSpendDataByDay(year, month);
          set({ spendDataByDay: data });
        } catch (error) {
          set({ error: "소비내역 들고오기 실패" });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "spend-store",
      getStorage: () => localStorage,
    }
  )
);

export default useSpendStore;
