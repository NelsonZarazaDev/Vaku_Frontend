import useEmployeeAuthStore from '../store/authEmployee/useEmployeeAuthStore';

export const getAuthHeader = () => {
    const { token } = useEmployeeAuthStore.getState();
    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  };