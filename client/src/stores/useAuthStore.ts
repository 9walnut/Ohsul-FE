import { createStore, StoreApi } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  userId: string | null;
  setUserId: (userId: string) => void;
  userNickname: string | null;
  setUserNickname: (userNickname: string) => void;
};

// Zustand 스토어 생성
const useAuthStore = createStore<AuthStore>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () =>
    set((state) => ({
      isLoggedIn: false,
      userId: null,
      userNickname: null,
    })),
  userId: null,
  setUserId: (userId: string) => set({ userId: userId }),
  userNickname: null,
  setUserNickname: (userId: string) => set({ userId: userId }),
}));

export default useAuthStore;

//-------------------사용 할 때 [상태 확인, 상태에 따른 처리]
//1) 상단에 store 불러오기
// import useAuthStore from "../../stores/useAuthStore";

//2) useAuthStore의 상태(state) 가져오기 -> 콘솔로 true false 확인.
//const isLoggedIn = useAuthStore.getState().isLoggedIn;

//3)끝...

//-------------------사용 할 때 [저장된 값 사용]
//1) 상단에 store 불러오기
// import useAuthStore from "../../stores/useAuthStore";

//2) 사용하기 ...끝....
//const userNickname = useAuthStore.getState().userNickname;
// const { userNickname } = useAuthStore.getState();
