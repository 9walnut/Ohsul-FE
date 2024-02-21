import create from "zustand";

interface SessionState {
  session: string | null;
  setSession: (session: string | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null, // 초기 세션 상태는 null
  setSession: (session) => set({ session }),
}));
