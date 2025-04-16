import React from "react";
import { Route, Routes } from "react-router";
import { ROUTES } from "../constants/routeNames";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.PATHLOGINCHILDREN} element={ROUTES.LOGINCHILDREN} />
      <Route path={ROUTES.PATHLOGINEMPLOYEE} element={ROUTES.LOGINEMPLOYEE} />
    </Routes>
  );
}
