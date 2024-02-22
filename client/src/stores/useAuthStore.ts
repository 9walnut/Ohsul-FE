import { createStore, StoreApi } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  userId: string | null;
  setUserId: (userId: string) => void;
  userNickname: string | null;
  setUserNickname: (userId: string) => void;
};

// Zustand 스토어 생성
const useAuthStore = createStore<AuthStore>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  userId: null,
  setUserId: (userId: string) => set({ userId: userId }),
  userNickname: null,
  setUserNickname: (userId: string) => set({ userId: userId }),
}));

export default useAuthStore;

//-------------------사용 할 때

//1) 상단에 store 불러오기
// import useAuthStore from "../../stores/useAuthStore";

//2) useAuthStore의 상태(state) 가져오기 -> 콘솔로 true false 확인.
//const isLoggedIn = useAuthStore.getState().isLoggedIn;

//3)끝...

//진행하면서 확인하려고 console.log 주석처리 안해놓아서
//하면서 적용 잘 되는지 보면 될 거 같습니다!
//코드가 생각보다 너무 적어서 이게 맞나 싶지만 콘솔창을 보니 잘 되는거같기는합니다..
//작업하다가 이상한 부분이 있따면 말씀해주세요!

//새로고침하면 로그아웃되어서 이건 더 찾아볼예정!
