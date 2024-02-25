import { createStore, StoreApi } from "zustand";
import { devtools, persist } from "zustand/middleware";

type FavoriteStore = {
  //즐겨찾기한 장소의 ID를 확인, 즐겨찾기에 추가됐는지 판단
  favoriteBars: { [barId: number]: boolean };
  //장소의 ID를 받아와 즐겨찾기 여부를 토글
  toggleFavorite: (barId: number) => void;

  barId: number | null;
  setBarId: (barId: number) => void;
  barName: string | null;
  setBarName: (barName: string) => void;
  telephone: number | null;
  setTelephone: (telephone: number) => void;
};

const useFavoriteStore = createStore<FavoriteStore>((set) => ({
  favoriteBars: {},
  toggleFavorite: (barId: number) =>
    set((state) => ({
      favoriteBars: {
        ...state.favoriteBars,
        [barId]: !state.favoriteBars[barId],
      },
    })),

  barId: null,
  setBarId: (barId: number) => set({ barId: barId }),
  barName: null,
  setBarName: (barName: string) => set({ barName: barName }),
  telephone: null,
  setTelephone: (telephone: number) => set({ telephone: telephone }),
}));

export default useFavoriteStore;
