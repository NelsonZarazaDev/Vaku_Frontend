import { create } from "zustand";

const useChildrenAuthStore = create((set) => ({
  token: null,
  persDocument: null,
  setChildrenAuthStore: (data) =>
    set({ token: data.token, persDocument: data.persDocument }),

  reset: () => set({ token: null, persDocument: null }),
}));

export default useChildrenAuthStore;
