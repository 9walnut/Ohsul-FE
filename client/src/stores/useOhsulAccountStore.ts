import { createStore } from "zustand";

type ohsulAccount = {
  ohsulId: string;
  ohsulPw: string;
  canDelete: boolean;
};

const useOhsulAccountStore = createStore<ohsulAccount>((set) => ({
  ohsulId: "ohsul",
  ohsulPw: "1234qwer",
  canDelete: false,
}));

export default useOhsulAccountStore;
