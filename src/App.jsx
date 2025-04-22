import React from "react";
import { BrowserRouter } from "react-router";
import MyRoutes from "./routes/routes";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <MyRoutes />
      <ToastContainer limit={1} />
    </BrowserRouter>
  );
}
