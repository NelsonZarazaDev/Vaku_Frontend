import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialEmployeeInfo = {
  persEmail: "",
  persDocument: "",
  persNames: "",
  persLastNames: "",
  persRole: "",
  emplToken: "",
  idEmpl: null,
};

const useEmployeeAuthStore = create(
  persist(
    (set) => ({
      token: null,
      employeeInfo: initialEmployeeInfo,

      setEmployeeAuthStore: (data) =>
        set((state) => ({
          ...state,
          token: data.token !== undefined ? data.token : state.token,
        })),

      setEmployeeInfo: (info) =>
        set((state) => ({
          ...state,
          employeeInfo: {
            persEmail:
              info.persEmail !== undefined ? info.persEmail : state.employeeInfo.persEmail,
            persDocument:
              info.persDocument !== undefined
                ? info.persDocument
                : state.employeeInfo.persDocument,
            persNames:
              info.persNames !== undefined ? info.persNames : state.employeeInfo.persNames,
            persLastNames:
              info.persLastNames !== undefined
                ? info.persLastNames
                : state.employeeInfo.persLastNames,
            persRole: info.persRole !== undefined ? info.persRole : state.employeeInfo.persRole,
            emplToken:
              info.emplToken !== undefined ? info.emplToken : state.employeeInfo.emplToken,
            idEmpl: info.idEmpl !== undefined ? info.idEmpl : state.employeeInfo.idEmpl,
          },
        })),

      reset: () =>
        set({
          token: null,
          employeeInfo: initialEmployeeInfo,
        }),
    }),
    {
      name: "vaku-employee-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        employeeInfo: state.employeeInfo,
      }),
    }
  )
);

export default useEmployeeAuthStore;
