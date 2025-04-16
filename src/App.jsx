import React from "react";
import { BrowserRouter } from "react-router";
import MyRoutes from "./routes/routes";

export default function App() {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
}
