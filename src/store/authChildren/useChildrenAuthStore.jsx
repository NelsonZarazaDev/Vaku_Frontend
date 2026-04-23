import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialState = {
  tokenChildren: null,
  persDocument: null,
  idChildren: null,
  emailParent: null,
  idVaccine: null,
};

const useChildrenAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      setChildrenAuthStore: (data) =>
        set((state) => ({
          ...state,
          tokenChildren:
            data.token !== undefined ? data.token : state.tokenChildren,
          persDocument:
            data.persDocument !== undefined ? data.persDocument : state.persDocument,
          idChildren:
            data.idChildren !== undefined ? data.idChildren : state.idChildren,
          emailParent:
            data.emailParent !== undefined ? data.emailParent : state.emailParent,
          idVaccine:
            data.idVaccine !== undefined ? data.idVaccine : state.idVaccine,
        })),
      reset: () => set(initialState),
    }),
    {
      name: "vaku-children-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        tokenChildren: state.tokenChildren,
        persDocument: state.persDocument,
        idChildren: state.idChildren,
        emailParent: state.emailParent,
        idVaccine: state.idVaccine,
      }),
    }
  )
);

export default useChildrenAuthStore;
