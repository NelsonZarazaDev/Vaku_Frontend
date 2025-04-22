import { create } from "zustand";

const useEmployeeAuthStore = create((set) => ({
  token: null,
  setEmployeeAuthStore: (data) => set({ token: data.token }),

  employeeInfo: {
    persEmail: "",
    persDocument: "",
    persNames: "",
    persLastNames: "",
    persRole: "",
    emplToken: "",
  },

  setEmployeeInfo: (info) =>
    set({
      persEmail: info.persEmail,
      persDocument: info.persDocument,
      persNames: info.persNames,
      persLastNames: info.persLastNames,
      persRole: info.persRole,
      emplToken: info.emplToken,
    }),

  reset: () =>
    set({
      token: null,
      employeeInfo: {
        persEmail: "",
        persDocument: "",
        persNames: "",
        persLastNames: "",
        persRole: "",
        emplToken: "",
      },
    }),
}));

export default useEmployeeAuthStore;
