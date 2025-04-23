// src/store/useDepartmentStore.js
import { create } from "zustand";

const useDepartmentStore = create((set) => ({
  depaId: null,
  setDepaId: (id) => set({ depaId: id }),
}));

export default useDepartmentStore;
