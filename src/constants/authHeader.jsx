import useChildrenAuthStore from "../store/authChildren/useChildrenAuthStore";
import useEmployeeAuthStore from "../store/authEmployee/useEmployeeAuthStore";

export const getAuthHeader = () => {
  const { token } = useEmployeeAuthStore.getState();
  const { tokenChildren } = useChildrenAuthStore.getState();
  const authToken = token || tokenChildren;

  return {
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};
