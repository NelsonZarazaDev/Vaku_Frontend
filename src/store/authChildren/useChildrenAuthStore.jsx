import { create } from 'zustand';

const useChildrenAuthStore = create((set) => ({
  token: null,
  persDocument:null,
  setChildrenAuthStore: (data) => set({ token: data.token, persDocument:data.persDocument }),
}));

export default useChildrenAuthStore;


