import { create } from "zustand";

const useEmployeeViewEditStore = create((set)=>({
    emailEmployee: null,
    setEmailEmployee: (email) => set({ emailEmployee: email }),
}));

export default useEmployeeViewEditStore;