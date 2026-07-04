import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import { ROUTE_PATHS } from "../../constants/routePath";
import useChildrenAuthStore from "../../store/authChildren/useChildrenAuthStore";
import useEmployeeAuthStore from "../../store/authEmployee/useEmployeeAuthStore";
import { isTokenValid } from "../../utils/authToken";

export default function Home() {
  const navigate = useNavigate();
  const employeeToken = useEmployeeAuthStore((state) => state.token);
  const childrenToken = useChildrenAuthStore((state) => state.tokenChildren);
  const resetEmployee = useEmployeeAuthStore((state) => state.reset);
  const resetChildren = useChildrenAuthStore((state) => state.reset);
  const hasValidToken = isTokenValid(employeeToken) || isTokenValid(childrenToken);

  useEffect(() => {
    if (!hasValidToken) {
      resetEmployee();
      resetChildren();
      navigate(ROUTE_PATHS.LOGIN_CHILDREN, { replace: true });
    }
  }, [hasValidToken, navigate, resetChildren, resetEmployee]);

  if (!hasValidToken) {
    return null;
  }

  return (
    <div className="app-shell">
      <Navbar />
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
}
