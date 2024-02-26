import { createStore, StoreApi } from "zustand";
import { devtools, persist } from "zustand/middleware";

type FavoriteStore = {
  // 즐겨찾기한 장소의 ID를 확인, 즐겨찾기에 추가됐는지 판단
  favoriteBars: number[];
  // 장소의 ID를 받아와 즐겨찾기 여부 토글
  toggleFavorite: (barId: number) => void;
  // 즐겨찾기 여부 확인
  isFavorite: (barId: number) => boolean;
};

const useFavoriteStore: any = createStore<FavoriteStore>((set) => ({
  favoriteBars: [],
  toggleFavorite: (barId: number) =>
    set((state) => {
      const isFavorite = state.favoriteBars.includes(barId);
      return {
        favoriteBars: isFavorite
          ? state.favoriteBars.filter((id) => id !== barId)
          : [...state.favoriteBars, barId],
      };
    }),
  isFavorite: (barId: number) =>
    useFavoriteStore.getState().favoriteBars.includes(barId),
}));

export default useFavoriteStore;

//유저가 즐겨찾기 한 장소 받아서
//각 장소의 barId 저장
//store에 favoriteBars[]로 관리

//즐겨찾기 추가 시
//클릭한 장소의 barId받아와서 favoriteBars[]에 추가

//즐겨찾기 삭제 동일

//----------------------------------
// const favoriteBars = useFavoriteStore.getState().favoriteBars|| {};

// const isFavorite = (barId: number) => {
//   return useFavoriteStore.getState().isFavorite(barId);
// };

// const isFavorite = useFavoriteStore((state) => state.favoriteBars[barId] || false);

// const toggleFavorite = (barId: number) => {
//   useFavoriteStore.getState().toggleFavorite(barId);
// };

// const handleToggleFavorite = () => {
//   useFavoriteStore((state) => {
//     state.toggleFavorite(barId);
//   });
// };
