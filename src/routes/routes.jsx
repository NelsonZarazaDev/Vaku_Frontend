import React from "react";
import { Route, Routes } from "react-router";
import { ROUTE_PATHS } from "../constants/routePath";
import { ROUTE_COMPONENTS } from "../constants/routeComponents";

export default function MyRoutes() {
  return (
    <Routes>
    <Route path={ROUTE_PATHS.LOGIN_CHILDREN} element={ROUTE_COMPONENTS.LOGIN_CHILDREN} />
    <Route path={ROUTE_PATHS.LOGIN_EMPLOYEE} element={ROUTE_COMPONENTS.LOGIN_EMPLOYEE} />
    <Route path={ROUTE_PATHS.HOME} element={ROUTE_COMPONENTS.HOME}>
      <Route path={ROUTE_PATHS.CHILDREN} element={ROUTE_COMPONENTS.CHILDREN} />
      <Route path={ROUTE_PATHS.PRIORITY} element={ROUTE_COMPONENTS.PRIORITY} />
      <Route path={ROUTE_PATHS.REGISTRATION_CHILDREN} element={ROUTE_COMPONENTS.REGISTRATION_CHILDREN} />
      <Route path={ROUTE_PATHS.REGISTRATION_EMPLOYEE} element={ROUTE_COMPONENTS.REGISTRATION_EMPLOYEE} />
      <Route path={ROUTE_PATHS.EMPLOYEES} element={ROUTE_COMPONENTS.EMPLOYEES} />
      <Route path={ROUTE_PATHS.INVENTORY} element={ROUTE_COMPONENTS.INVENTORY} />
    </Route>
  </Routes>
  );
}
