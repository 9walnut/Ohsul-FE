import { createStore } from "zustand";

type ohsulAccount = {
  ohsulId: string;
  ohsulPw: string;
};

const useOhsulAccountStore = createStore<ohsulAccount>((set) => ({
  ohsulId: "ohsul",
  ohsulPw: "1234qwer",
}));

export default useOhsulAccountStore;
