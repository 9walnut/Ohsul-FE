import create, { createStore } from "zustand";
//typescript에서는 create 말고 createStore 사용.
interface AuthStore {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}
//isLoggedIn 값을 관리 스토어 생성
const useAuthStore = createStore<AuthStore>((set) => ({
  isLoggedIn: false, // 초기값 false
  setLoggedIn: (value) => set({ isLoggedIn: value }), // isLoggedIn 값을 설정하는 액션
}));

export default useAuthStore;
