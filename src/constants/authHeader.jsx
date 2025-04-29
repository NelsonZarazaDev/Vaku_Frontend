import useChildrenAuthStore from "../store/authChildren/useChildrenAuthStore";
import useEmployeeAuthStore from "../store/authEmployee/useEmployeeAuthStore";

export const getAuthHeader = () => {
  const { token } = useEmployeeAuthStore.getState();
  const { tokenChildren } = useChildrenAuthStore.getState();

  return {
    Authorization: `Bearer ${token || tokenChildren}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};
