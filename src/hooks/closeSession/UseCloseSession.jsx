import React from "react";
import { useNavigate } from "react-router";
import useEmployeeAuthStore from "../../store/authEmployee/useEmployeeAuthStore";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import { ROUTE_PATHS } from "../../constants/routePath";
import { showToast } from "../../components/notifyToast/NotifyToast";

export default function UseCloseSession() {
  const navigate = useNavigate();

  const resetEmployee = useEmployeeAuthStore((state) => state.reset);
  const resetChildren = useChildrenAuthStore((state) => state.reset);

  const logoutAll = () => {
    resetEmployee();
    resetChildren();
    showToast("Sesión finalizada", "success");
    navigate(ROUTE_PATHS.LOGIN_CHILDREN);
  };

  return { logoutAll };
}
