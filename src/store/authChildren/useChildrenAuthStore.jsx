import { create } from "zustand";

const useChildrenAuthStore = create((set) => ({
  tokenChildren: null,
  persDocument: null,
  idChildren: null,
  emailParent: null,
  idVaccine: null,
  setChildrenAuthStore: (data) =>
    set({
      tokenChildren: data.token,
      persDocument: data.persDocument,
      idChildren: data.idChildren,
      emailParent: data.emailParent,
      idVaccine: data.idVaccine,
    }),

  reset: () =>
    set({
      tokenChildren: null,
      persDocument: null,
      idChildren: null,
      emailParent: null,
      idVaccine: null,
    }),
}));

export default useChildrenAuthStore;
