import { createStore, StoreApi } from "zustand";
import { devtools, persist } from "zustand/middleware";

type FavoriteStore = {
  barId: number | null;
  setBarId: (barId: number) => void;
  barName: string | null;
  setBarName: (barName: string) => void;
  telephone: number | null;
  setTelephone: (telephone: number) => void;
};

const useFavoriteStore = createStore<FavoriteStore>((set) => ({
  barId: null,
  setBarId: (barId: number) => set({ barId: barId }),
  barName: null,
  setBarName: (barName: string) => set({ barName: barName }),
  telephone: null,
  setTelephone: (telephone: number) => set({ telephone: telephone }),
}));

export default useFavoriteStore;
