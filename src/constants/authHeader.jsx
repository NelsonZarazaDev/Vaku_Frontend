import useEmployeeAuthStore from '../store/authEmployee/useEmployeeAuthStore';

export const getAuthHeader = () => {
    const { token } = useEmployeeAuthStore.getState();
    console.log(token);
    
    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  };